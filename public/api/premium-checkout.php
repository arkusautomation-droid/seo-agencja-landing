<?php
/**
 * Premium Audit Checkout Redirect — GET /api/premium-checkout.php
 *
 * Receives audit type + URL + score via GET params.
 * Stores the premium request in SQLite.
 * Redirects to Stripe Payment Link (or thank-you page if not configured).
 *
 * Usage: /api/premium-checkout.php?type=local&url=example.com&score=45
 *
 * mastermarketing.io/seo-oferta
 */

require_once __DIR__ . '/config.php';

// CORS (for XHR-based calls; mainly this is a redirect endpoint)
setCorsHeaders();

// Accept GET only
if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
    handlePreflight();
    jsonError('Metoda niedozwolona. Użyj GET.', 405);
}
handlePreflight();

// ── Parse & Validate Input ──────────────────────────────────────────────────

$type  = sanitize($_GET['type'] ?? '');
$url   = sanitize($_GET['url'] ?? '');
$score = sanitizeInt($_GET['score'] ?? 0);
$email = sanitizeEmail($_GET['email'] ?? '');

// Validate type
$validTypes = ['local', 'national', 'ecommerce'];
if (empty($type) || !in_array($type, $validTypes, true)) {
    jsonError('Nieprawidłowy typ audytu. Dozwolone: local, national, ecommerce.', 422);
}

// ── Store Premium Request in Database ───────────────────────────────────────

try {
    $db = getDB();

    $stmt = $db->prepare('
        INSERT INTO premium_requests (type, url, score, email, created_at)
        VALUES (:type, :url, :score, :email, datetime("now"))
    ');

    $stmt->execute([
        ':type'  => $type,
        ':url'   => $url,
        ':score' => $score,
        ':email' => $email,
    ]);

    $requestId = $db->lastInsertId();

} catch (PDOException $e) {
    error_log('Premium checkout DB error: ' . $e->getMessage());
    jsonError('Błąd zapisu. Spróbuj ponownie.', 500);
}

// ── Send Admin Notification ─────────────────────────────────────────────────

$typeLabel = match ($type) {
    'local'     => 'SEO Lokalne',
    'national'  => 'SEO Ogólnopolskie',
    'ecommerce' => 'SEO E-commerce',
    default     => $type,
};

$adminHtml = '
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8">' . getEmailStyles() . '</head>
<body>
<div class="container">
    <div class="header" style="background:linear-gradient(135deg,#9B62FF,#6037FF);">
        <h1>💎 Nowe zamówienie Premium Audit</h1>
        <p>Request #' . $requestId . ' — ' . date('d.m.Y H:i') . '</p>
    </div>
    <div class="body">
        <table class="info-table">
            <tr><td>Typ audytu</td><td><strong>' . htmlspecialchars($typeLabel) . '</strong></td></tr>
            <tr><td>URL</td><td><a href="' . htmlspecialchars($url) . '">' . htmlspecialchars($url) . '</a></td></tr>
            <tr><td>Wynik darmowego audytu</td><td>' . $score . '/100</td></tr>
            ' . ($email ? '<tr><td>Email</td><td><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td></tr>' : '') . '
        </table>
    </div>
    <div class="footer">
        <p>Master Marketing Premium Audit System</p>
    </div>
</div>
</body>
</html>
';

$emailResult = sendEmail(
    ADMIN_EMAIL,
    "[PREMIUM] {$typeLabel} — {$url}",
    $adminHtml,
    $email ?: null
);

if ($emailResult !== true) {
    error_log("Premium checkout admin email failed: {$emailResult}");
}

// ── Redirect ────────────────────────────────────────────────────────────────

// Check if Stripe links are configured (not placeholder)
$stripeLink = STRIPE_LINKS[$type] ?? '';
$isConfigured = $stripeLink && !str_contains($stripeLink, 'placeholder');

if ($isConfigured) {
    // Append prefilled fields to Stripe Payment Link
    $redirectUrl = $stripeLink;
    $params = [];
    if ($email) {
        $params['prefilled_email'] = $email;
    }
    if (!empty($params)) {
        $redirectUrl .= '?' . http_build_query($params);
    }
} else {
    // Stripe not configured — redirect to thank-you / contact page
    $redirectUrl = SITE_URL . '/audyt/dziekujemy/?type=premium&audit_type=' . urlencode($type) . '&url=' . urlencode($url);
}

header('Location: ' . $redirectUrl, true, 302);
exit;
