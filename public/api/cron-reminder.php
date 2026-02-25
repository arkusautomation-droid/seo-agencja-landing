<?php
/**
 * 7-Day Follow-up Reminder CRON — /api/cron-reminder.php
 *
 * Sends a follow-up email to leads who:
 *   - Have reminder_sent = 0
 *   - Were created more than 7 days ago
 *
 * Can be triggered via:
 *   - CLI:  php /path/to/cron-reminder.php
 *   - HTTP: GET /api/cron-reminder.php?key=CRON_SECRET
 *
 * Crontab example (daily at 9:00 AM):
 *   0 9 * * * php /home/user/domains/mastermarketing.io/public_html/seo-oferta/api/cron-reminder.php
 *
 * mastermarketing.io/seo-oferta
 */

require_once __DIR__ . '/config.php';

// ── Auth: verify secret key (HTTP mode) or allow CLI ────────────────────────

$isCli = (php_sapi_name() === 'cli');

if (!$isCli) {
    setCorsHeaders();

    $key = $_GET['key'] ?? '';
    if ($key !== CRON_SECRET) {
        jsonError('Nieprawidłowy klucz autoryzacji.', 403);
    }
}

// ── Query Leads Eligible for Reminder ───────────────────────────────────────

try {
    $db = getDB();

    // Find leads where:
    // - reminder_sent = 0
    // - created_at is older than 7 days
    // - email is not empty
    $stmt = $db->prepare("
        SELECT *
        FROM leads
        WHERE reminder_sent = 0
          AND email != ''
          AND created_at <= datetime('now', '-7 days')
        ORDER BY created_at ASC
        LIMIT 100
    ");

    $stmt->execute();
    $leads = $stmt->fetchAll();

} catch (PDOException $e) {
    $msg = 'Cron reminder DB error: ' . $e->getMessage();
    error_log($msg);
    if ($isCli) {
        echo "[ERROR] {$msg}\n";
        exit(1);
    }
    jsonError($msg, 500);
}

// ── Process Each Lead ───────────────────────────────────────────────────────

$processed  = 0;
$errors     = 0;
$results    = [];

foreach ($leads as $lead) {
    $leadId     = $lead['id'];
    $name       = $lead['name'];
    $email      = $lead['email'];
    $auditUrl   = $lead['audit_url'];
    $auditScore = (int) $lead['audit_score'];
    $auditData  = json_decode($lead['audit_data'] ?? '{}', true);
    $businessType    = $lead['business_type'];
    $packageRec      = $lead['package_recommended'];
    $createdAt       = $lead['created_at'];

    $scoreColor = getScoreColor($auditScore);
    $scoreLabel = getScoreLabel($auditScore);

    $typeLabel = match ($businessType) {
        'local'     => 'SEO Lokalne',
        'national'  => 'SEO Ogólnopolskie',
        'ecommerce' => 'SEO E-commerce',
        default     => 'SEO',
    };

    // Build priorities HTML for the reminder
    $priorities = $auditData['priorities'] ?? [];
    $prioritiesHtml = '';
    if (!empty($priorities)) {
        $prioritiesHtml = '<h3 style="font-size:16px;margin:20px 0 10px;color:#333;">Kluczowe problemy do naprawienia:</h3>';
        foreach (array_slice($priorities, 0, 3) as $i => $p) {
            $text = htmlspecialchars(is_string($p) ? $p : ($p['text'] ?? $p['label'] ?? ''));
            $num = $i + 1;
            $prioritiesHtml .= "
                <div style='background:#fff8f0;border-left:3px solid #f97316;padding:10px 14px;margin:8px 0;border-radius:0 6px 6px 0;font-size:14px;'>
                    <strong>{$num}.</strong> {$text}
                </div>
            ";
        }
    }

    // Build follow-up email
    $emailHtml = '
    <!DOCTYPE html>
    <html lang="pl">
    <head><meta charset="UTF-8">' . getEmailStyles() . '</head>
    <body>
    <div class="container">
        <div class="header">
            <h1>Jak idzie poprawa SEO?</h1>
            <p>Sprawdź co się zmieniło od ostatniego audytu</p>
        </div>
        <div class="body">
            <p>Cześć <strong>' . htmlspecialchars($name) . '</strong>,</p>

            <p>Tydzień temu przeprowadziłeś/aś darmowy audyt SEO swojej strony
            <strong>' . htmlspecialchars($auditUrl) . '</strong>.
            Twój wynik wyniósł <strong style="color:' . $scoreColor . ';">' . $auditScore . '/100</strong>.</p>

            <p>Czy udało Ci się wdrożyć jakieś zmiany? Jeśli nie — nic straconego!
            Każdy dzień bez optymalizacji to stracone pozycje i klienci, którzy trafiają do Twojej konkurencji.</p>

            ' . $prioritiesHtml . '

            <div style="background:#f0f0ff;border-radius:10px;padding:24px;margin:24px 0;text-align:center;">
                <h3 style="font-size:18px;color:#333;margin:0 0 8px;">Potrzebujesz pomocy specjalisty?</h3>
                <p style="font-size:14px;color:#666;margin:0 0 16px;">
                    Nasz zespół może zająć się Twoim SEO od A do Z.
                    ' . ($packageRec ? 'Dla Twojej strony rekomendujemy pakiet <strong>' . htmlspecialchars($packageRec) . '</strong>.' : '') . '
                </p>
                <a href="' . SITE_URL . '/#cennik" class="cta-btn">Zobacz pakiety SEO →</a>
            </div>

            <p style="font-size:14px;color:#555;">Możesz też przeprowadzić audyt ponownie, żeby sprawdzić postępy:</p>
            <p style="text-align:center;">
                <a href="' . SITE_URL . '/audyt/" class="cta-btn" style="background:#f97316;">Powtórz darmowy audyt →</a>
            </p>

            <p style="font-size:13px;color:#888;margin-top:30px;">
                Ta wiadomość jest jednorazowym przypomnieniem. Nie wyślemy więcej automatycznych wiadomości.
                Jeśli nie chcesz otrzymywać takich wiadomości, po prostu zignoruj tę wiadomość.
            </p>
        </div>
        <div class="footer">
            <p>Master Marketing | <a href="' . SITE_URL . '" style="color:#6037FF;">mastermarketing.io/seo-oferta</a></p>
        </div>
    </div>
    </body>
    </html>
    ';

    // Send the reminder
    $result = sendEmail(
        $email,
        "Przypomnienie: Twój audyt SEO — {$auditScore}/100 — co dalej?",
        $emailHtml
    );

    // Update reminder_sent regardless (don't spam if email fails)
    try {
        $updateStmt = $db->prepare('UPDATE leads SET reminder_sent = 1 WHERE id = :id');
        $updateStmt->execute([':id' => $leadId]);
    } catch (PDOException $e) {
        error_log("Cron reminder: failed to update lead #{$leadId}: " . $e->getMessage());
    }

    if ($result === true) {
        $processed++;
        $results[] = ['id' => $leadId, 'email' => $email, 'status' => 'sent'];
    } else {
        $errors++;
        $results[] = ['id' => $leadId, 'email' => $email, 'status' => 'failed', 'error' => $result];
        error_log("Cron reminder email failed for lead #{$leadId} ({$email}): {$result}");
    }
}

// ── Send Summary to Admin (if any leads processed) ─────────────────────────

if ($processed > 0 || $errors > 0) {
    $summaryRows = '';
    foreach ($results as $r) {
        $statusIcon  = $r['status'] === 'sent' ? '✅' : '❌';
        $summaryRows .= '<tr><td>#' . $r['id'] . '</td><td>' . htmlspecialchars($r['email']) . '</td><td>' . $statusIcon . ' ' . $r['status'] . '</td></tr>';
    }

    $summaryHtml = '
    <!DOCTYPE html>
    <html lang="pl">
    <head><meta charset="UTF-8">' . getEmailStyles() . '</head>
    <body>
    <div class="container">
        <div class="header" style="background:linear-gradient(135deg,#3b82f6,#6037FF);">
            <h1>📊 CRON Reminder — Raport</h1>
            <p>' . date('d.m.Y H:i') . '</p>
        </div>
        <div class="body">
            <table class="info-table">
                <tr><td>Wysłane</td><td><strong style="color:#22c55e;">' . $processed . '</strong></td></tr>
                <tr><td>Błędy</td><td><strong style="color:#ef4444;">' . $errors . '</strong></td></tr>
                <tr><td>Łącznie</td><td><strong>' . count($results) . '</strong></td></tr>
            </table>

            <h3 style="font-size:16px;margin:20px 0 10px;">Szczegóły</h3>
            <table class="info-table">
                <tr style="background:#f9fafb;"><td><strong>ID</strong></td><td><strong>Email</strong></td><td><strong>Status</strong></td></tr>
                ' . $summaryRows . '
            </table>
        </div>
        <div class="footer">
            <p>Master Marketing CRON System</p>
        </div>
    </div>
    </body>
    </html>
    ';

    sendEmail(
        ADMIN_EMAIL,
        "[CRON] Reminder: {$processed} wysłanych, {$errors} błędów",
        $summaryHtml
    );
}

// ── Output ──────────────────────────────────────────────────────────────────

$summary = [
    'total'     => count($leads),
    'processed' => $processed,
    'errors'    => $errors,
    'timestamp' => date('Y-m-d H:i:s'),
];

if ($isCli) {
    echo "=== CRON Reminder Report ===\n";
    echo "Total leads eligible: {$summary['total']}\n";
    echo "Emails sent:          {$summary['processed']}\n";
    echo "Errors:               {$summary['errors']}\n";
    echo "Timestamp:            {$summary['timestamp']}\n";

    if (!empty($results)) {
        echo "\nDetails:\n";
        foreach ($results as $r) {
            $icon = $r['status'] === 'sent' ? '[OK]' : '[FAIL]';
            echo "  {$icon} Lead #{$r['id']} — {$r['email']}" .
                 (isset($r['error']) ? " — {$r['error']}" : '') . "\n";
        }
    }

    exit($errors > 0 ? 1 : 0);
}

jsonSuccess($summary);
