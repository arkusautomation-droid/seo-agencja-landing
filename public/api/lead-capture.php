<?php
/**
 * SEO Audit Lead Capture — POST /api/lead-capture.php
 *
 * Receives audit results + contact info from the lead capture form.
 * Stores in SQLite, sends confirmation email to lead,
 * sends notification email to admin.
 *
 * mastermarketing.io/seo-oferta
 */

require_once __DIR__ . '/config.php';

// CORS
handlePreflight();
setCorsHeaders();

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Metoda niedozwolona. Użyj POST.', 405);
}

// ── Parse Input ─────────────────────────────────────────────────────────────

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    // Fallback: try form-encoded
    $input = $_POST;
}

if (empty($input)) {
    jsonError('Brak danych wejściowych.', 400);
}

// ── Extract & Sanitize Fields ───────────────────────────────────────────────

$name               = sanitize($input['name'] ?? '');
$company            = sanitize($input['company'] ?? '');
$city               = sanitize($input['city'] ?? '');
$phone              = sanitize($input['phone'] ?? '');
$email              = sanitizeEmail($input['email'] ?? '');
$consentMarketing   = sanitizeBool($input['consent_marketing'] ?? false);
$consentPhone       = sanitizeBool($input['consent_phone'] ?? false);
$auditUrl           = sanitize($input['audit_url'] ?? '');
$auditScore         = sanitizeInt($input['audit_score'] ?? 0);
$businessType       = sanitize($input['business_type'] ?? '');
$packageRecommended = sanitize($input['package_recommended'] ?? '');
$auditDate          = sanitize($input['audit_date'] ?? date('Y-m-d H:i:s'));

// JSON fields — keep as JSON strings in DB
$auditModules    = $input['audit_modules'] ?? [];
$auditPriorities = $input['audit_priorities'] ?? [];

// Build audit_data JSON blob (all audit-related info in one field)
$auditData = json_encode([
    'modules'    => $auditModules,
    'priorities' => $auditPriorities,
    'url'        => $auditUrl,
    'score'      => $auditScore,
    'date'       => $auditDate,
], JSON_UNESCAPED_UNICODE);

// ── Validate Required Fields ────────────────────────────────────────────────

$errors = [];

if (empty($name)) {
    $errors[] = 'Imię i nazwisko jest wymagane.';
}

if (empty($email)) {
    $errors[] = 'Prawidłowy adres email jest wymagany.';
}

if (mb_strlen($name) > 200) {
    $errors[] = 'Imię jest zbyt długie (max 200 znaków).';
}

if (mb_strlen($company) > 300) {
    $errors[] = 'Nazwa firmy jest zbyt długa (max 300 znaków).';
}

if (!empty($phone) && !preg_match('/^[\d\s\+\-\(\)]{6,20}$/', $phone)) {
    $errors[] = 'Nieprawidłowy format numeru telefonu.';
}

if (!empty($errors)) {
    jsonError(implode(' ', $errors), 422);
}

// ── Store in Database ───────────────────────────────────────────────────────

try {
    $db = getDB();

    $stmt = $db->prepare('
        INSERT INTO leads (
            name, company, city, phone, email,
            consent_marketing, consent_phone,
            audit_url, audit_score, business_type,
            package_recommended, audit_date, audit_data,
            created_at, reminder_sent
        ) VALUES (
            :name, :company, :city, :phone, :email,
            :consent_marketing, :consent_phone,
            :audit_url, :audit_score, :business_type,
            :package_recommended, :audit_date, :audit_data,
            datetime("now"), 0
        )
    ');

    $stmt->execute([
        ':name'                => $name,
        ':company'             => $company,
        ':city'                => $city,
        ':phone'               => $phone,
        ':email'               => $email,
        ':consent_marketing'   => $consentMarketing,
        ':consent_phone'       => $consentPhone,
        ':audit_url'           => $auditUrl,
        ':audit_score'         => $auditScore,
        ':business_type'       => $businessType,
        ':package_recommended' => $packageRecommended,
        ':audit_date'          => $auditDate,
        ':audit_data'          => $auditData,
    ]);

    $leadId = $db->lastInsertId();

} catch (PDOException $e) {
    error_log('Lead capture DB error: ' . $e->getMessage());
    jsonError('Błąd zapisu danych. Spróbuj ponownie.', 500);
}

// ── Send Confirmation Email to Lead ─────────────────────────────────────────

$scoreColor = getScoreColor($auditScore);
$scoreLabel = getScoreLabel($auditScore);
$modulesHtml    = buildModulesHtml(is_array($auditModules) ? $auditModules : []);
$prioritiesHtml = buildPrioritiesHtml(is_array($auditPriorities) ? $auditPriorities : []);

$packageLabel = match ($businessType) {
    'local'     => 'SEO Lokalne',
    'national'  => 'SEO Ogólnopolskie',
    'ecommerce' => 'SEO E-commerce',
    default     => 'SEO',
};

$leadEmailHtml = '
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8">' . getEmailStyles() . '</head>
<body>
<div class="container">
    <div class="header">
        <h1>Wyniki Twojego audytu SEO</h1>
        <p>' . htmlspecialchars($auditUrl) . '</p>
    </div>
    <div class="body">
        <p>Cześć <strong>' . htmlspecialchars($name) . '</strong>,</p>
        <p>Dziękujemy za przeprowadzenie darmowego audytu SEO Twojej strony. Poniżej znajdziesz podsumowanie wyników.</p>

        <div style="text-align:center;margin:24px 0;">
            <div class="score-badge" style="background:' . $scoreColor . ';">' . $auditScore . '</div>
            <div class="score-label">Wynik ogólny — <strong style="color:' . $scoreColor . ';">' . $scoreLabel . '</strong></div>
        </div>

        <table class="info-table">
            <tr><td>Strona</td><td>' . htmlspecialchars($auditUrl) . '</td></tr>
            <tr><td>Typ biznesu</td><td>' . htmlspecialchars($packageLabel) . '</td></tr>
            ' . ($packageRecommended ? '<tr><td>Rekomendowany pakiet</td><td><strong>' . htmlspecialchars($packageRecommended) . '</strong></td></tr>' : '') . '
            <tr><td>Data audytu</td><td>' . htmlspecialchars($auditDate) . '</td></tr>
        </table>

        ' . $modulesHtml . '
        ' . $prioritiesHtml . '

        <div style="text-align:center;margin:30px 0;">
            <p style="font-size:15px;color:#555;">Chcesz poprawić swoje wyniki SEO?</p>
            <a href="' . SITE_URL . '/#cennik" class="cta-btn">Zobacz pakiety SEO →</a>
        </div>

        <p style="font-size:13px;color:#888;margin-top:30px;">
            Ten audyt został wygenerowany automatycznie przez narzędzie Master Marketing SEO Audit.
            Wyniki mają charakter orientacyjny i nie zastępują pełnego audytu przeprowadzonego przez specjalistę.
        </p>
    </div>
    <div class="footer">
        <p>Master Marketing | <a href="' . SITE_URL . '" style="color:#6037FF;">mastermarketing.io/seo-oferta</a></p>
        <p>Otrzymujesz tę wiadomość, ponieważ przeprowadziłeś/aś darmowy audyt SEO.</p>
    </div>
</div>
</body>
</html>
';

$leadEmailResult = sendEmail(
    $email,
    "Wyniki audytu SEO — {$auditScore}/100 — " . parse_url($auditUrl, PHP_URL_HOST),
    $leadEmailHtml
);

// ── Send Notification Email to Admin ────────────────────────────────────────

$adminEmailHtml = '
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8">' . getEmailStyles() . '</head>
<body>
<div class="container">
    <div class="header" style="background:linear-gradient(135deg,#f97316,#ef4444);">
        <h1>🔔 Nowy lead z audytu SEO</h1>
        <p>Lead #' . $leadId . ' — ' . date('d.m.Y H:i') . '</p>
    </div>
    <div class="body">
        <div style="text-align:center;margin:16px 0;">
            <div class="score-badge" style="background:' . $scoreColor . ';">' . $auditScore . '</div>
            <div class="score-label">Wynik audytu</div>
        </div>

        <h3 style="font-size:16px;color:#333;margin:20px 0 10px;">Dane kontaktowe</h3>
        <table class="info-table">
            <tr><td>Imię i nazwisko</td><td><strong>' . htmlspecialchars($name) . '</strong></td></tr>
            <tr><td>Email</td><td><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td></tr>
            ' . ($company ? '<tr><td>Firma</td><td>' . htmlspecialchars($company) . '</td></tr>' : '') . '
            ' . ($city ? '<tr><td>Miasto</td><td>' . htmlspecialchars($city) . '</td></tr>' : '') . '
            ' . ($phone ? '<tr><td>Telefon</td><td><a href="tel:' . htmlspecialchars($phone) . '">' . htmlspecialchars($phone) . '</a></td></tr>' : '') . '
            <tr><td>Zgoda marketing</td><td>' . ($consentMarketing ? '✅ Tak' : '❌ Nie') . '</td></tr>
            <tr><td>Zgoda telefoniczna</td><td>' . ($consentPhone ? '✅ Tak' : '❌ Nie') . '</td></tr>
        </table>

        <h3 style="font-size:16px;color:#333;margin:20px 0 10px;">Dane audytu</h3>
        <table class="info-table">
            <tr><td>URL</td><td><a href="' . htmlspecialchars($auditUrl) . '" target="_blank">' . htmlspecialchars($auditUrl) . '</a></td></tr>
            <tr><td>Typ biznesu</td><td>' . htmlspecialchars($packageLabel) . '</td></tr>
            <tr><td>Rekomendowany pakiet</td><td><strong>' . htmlspecialchars($packageRecommended) . '</strong></td></tr>
            <tr><td>Data audytu</td><td>' . htmlspecialchars($auditDate) . '</td></tr>
        </table>

        ' . $modulesHtml . '
        ' . $prioritiesHtml . '
    </div>
    <div class="footer">
        <p>Master Marketing Lead Capture System</p>
    </div>
</div>
</body>
</html>
';

$adminEmailResult = sendEmail(
    ADMIN_EMAIL,
    "[LEAD] {$name} — {$auditScore}/100 — " . parse_url($auditUrl, PHP_URL_HOST),
    $adminEmailHtml,
    $email // Reply-To: the lead's email
);

// ── Log email errors (non-blocking) ────────────────────────────────────────

if ($leadEmailResult !== true) {
    error_log("Lead email failed for {$email}: {$leadEmailResult}");
}
if ($adminEmailResult !== true) {
    error_log("Admin notification email failed: {$adminEmailResult}");
}

// ── Success Response ────────────────────────────────────────────────────────

jsonSuccess([
    'lead_id'    => (int) $leadId,
    'email_sent' => $leadEmailResult === true,
    'message'    => 'Dziękujemy! Wyniki audytu zostały wysłane na Twój email.',
]);
