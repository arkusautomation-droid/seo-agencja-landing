<?php
/**
 * SEO Audit Lead Capture — Shared Configuration
 * mastermarketing.io/seo-oferta
 */

// Error reporting (disable display in production)
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Timezone
date_default_timezone_set('Europe/Warsaw');

// ── Constants ───────────────────────────────────────────────────────────────

define('ADMIN_EMAIL', 'arkadiussixer@gmail.com');
define('FROM_EMAIL', 'noreply@mastermarketing.io');
define('FROM_NAME', 'Master Marketing — SEO Audit');
define('SITE_URL', 'https://mastermarketing.io/seo-oferta');
define('DB_PATH', __DIR__ . '/../data/leads.db');

// Stripe (placeholders — fill when configured)
define('STRIPE_WEBHOOK_SECRET', 'whsec_PLACEHOLDER_REPLACE_WITH_REAL_SECRET');

// Cron secret key (for HTTP-triggered cron)
define('CRON_SECRET', 'cr0n_s3cr3t_k3y_ch4ng3_m3');

// CORS allowed origins
define('ALLOWED_ORIGINS', [
    'https://mastermarketing.io',
    'http://localhost:3000',
    'http://localhost:3001',
]);

// Stripe Payment Links (placeholders — fill when configured)
define('STRIPE_LINKS', [
    'local'    => 'https://buy.stripe.com/placeholder_local',
    'national' => 'https://buy.stripe.com/placeholder_national',
    'ecommerce'=> 'https://buy.stripe.com/placeholder_ecommerce',
]);

// ── CORS Helper ─────────────────────────────────────────────────────────────

function setCorsHeaders(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Default to production domain
        header('Access-Control-Allow-Origin: https://mastermarketing.io');
    }

    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');
    header('Content-Type: application/json; charset=utf-8');
}

function handlePreflight(): void
{
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        setCorsHeaders();
        http_response_code(204);
        exit;
    }
}

// ── JSON Response Helpers ───────────────────────────────────────────────────

function jsonSuccess(array $data = []): never
{
    echo json_encode(array_merge(['success' => true], $data), JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonError(string $message, int $code = 400): never
{
    http_response_code($code);
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

// ── Database ────────────────────────────────────────────────────────────────

function getDB(): PDO
{
    $dbDir = dirname(DB_PATH);
    if (!is_dir($dbDir)) {
        mkdir($dbDir, 0755, true);
    }

    $pdo = new PDO('sqlite:' . DB_PATH, null, null, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Enable WAL mode for better concurrent access
    $pdo->exec('PRAGMA journal_mode=WAL');

    // Create tables if they don't exist
    $pdo->exec('
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT DEFAULT "",
            city TEXT DEFAULT "",
            phone TEXT DEFAULT "",
            email TEXT NOT NULL,
            consent_marketing INTEGER DEFAULT 0,
            consent_phone INTEGER DEFAULT 0,
            audit_url TEXT DEFAULT "",
            audit_score INTEGER DEFAULT 0,
            business_type TEXT DEFAULT "",
            package_recommended TEXT DEFAULT "",
            audit_date TEXT DEFAULT "",
            audit_data TEXT DEFAULT "{}",
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            reminder_sent INTEGER DEFAULT 0
        )
    ');

    $pdo->exec('
        CREATE TABLE IF NOT EXISTS premium_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            url TEXT DEFAULT "",
            score INTEGER DEFAULT 0,
            email TEXT DEFAULT "",
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    ');

    $pdo->exec('
        CREATE TABLE IF NOT EXISTS stripe_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL,
            event_id TEXT DEFAULT "",
            session_id TEXT DEFAULT "",
            customer_email TEXT DEFAULT "",
            amount INTEGER DEFAULT 0,
            currency TEXT DEFAULT "pln",
            metadata TEXT DEFAULT "{}",
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    ');

    return $pdo;
}

// ── Input Sanitization ──────────────────────────────────────────────────────

function sanitize(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function sanitizeEmail(string $email): string
{
    $email = trim(strtolower($email));
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
}

function sanitizeInt($value): int
{
    return (int) filter_var($value, FILTER_SANITIZE_NUMBER_INT);
}

function sanitizeBool($value): int
{
    return $value ? 1 : 0;
}

// ── Email Sending ───────────────────────────────────────────────────────────

/**
 * Send HTML email using mail() function.
 * Returns true on success, error string on failure.
 */
function sendEmail(string $to, string $subject, string $htmlBody, ?string $replyTo = null): bool|string
{
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
        'X-Mailer: PHP/' . phpversion(),
    ];

    if ($replyTo) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    $headerStr = implode("\r\n", $headers);

    $result = @mail($to, $subject, $htmlBody, $headerStr);

    if (!$result) {
        $lastError = error_get_last();
        return $lastError['message'] ?? 'mail() returned false';
    }

    return true;
}

// ── Email Templates ─────────────────────────────────────────────────────────

function getEmailStyles(): string
{
    return '
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #6037FF, #9B62FF); padding: 30px 40px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 22px; margin: 0; font-weight: 600; }
            .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin: 8px 0 0; }
            .body { padding: 30px 40px; }
            .score-badge { display: inline-block; background: #6037FF; color: #fff; font-size: 32px; font-weight: 700; width: 80px; height: 80px; line-height: 80px; border-radius: 50%; text-align: center; margin: 10px 0; }
            .score-label { font-size: 14px; color: #666; margin-top: 4px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
            .info-table td:first-child { font-weight: 600; color: #555; width: 40%; }
            .module-bar { background: #e5e5e5; border-radius: 4px; height: 8px; margin-top: 4px; }
            .module-fill { height: 8px; border-radius: 4px; }
            .cta-btn { display: inline-block; background: #6037FF; color: #fff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 20px 0; }
            .footer { background: #f9fafb; padding: 20px 40px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
            .priority-item { background: #fff8f0; border-left: 3px solid #f97316; padding: 10px 14px; margin: 8px 0; border-radius: 0 6px 6px 0; font-size: 14px; }
            .green { color: #22c55e; }
            .orange { color: #f97316; }
            .red { color: #ef4444; }
        </style>
    ';
}

function getScoreColor(int $score): string
{
    if ($score >= 70) return '#22c55e';
    if ($score >= 40) return '#f97316';
    return '#ef4444';
}

function getScoreLabel(int $score): string
{
    if ($score >= 70) return 'Dobry';
    if ($score >= 40) return 'Wymaga poprawy';
    return 'Krytyczny';
}

function buildModulesHtml(array $modules): string
{
    if (empty($modules)) return '';

    $html = '<h3 style="font-size:16px;margin:20px 0 10px;color:#333;">Wyniki modułów audytu</h3>';

    foreach ($modules as $module) {
        $name  = htmlspecialchars($module['name'] ?? $module['label'] ?? 'Moduł');
        $score = (int) ($module['score'] ?? 0);
        $color = getScoreColor($score);

        $html .= "
            <div style='margin:10px 0;'>
                <div style='display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px;'>
                    <span>{$name}</span>
                    <strong style='color:{$color}'>{$score}/100</strong>
                </div>
                <div class='module-bar'>
                    <div class='module-fill' style='width:{$score}%;background:{$color};'></div>
                </div>
            </div>
        ";
    }

    return $html;
}

function buildPrioritiesHtml(array $priorities): string
{
    if (empty($priorities)) return '';

    $html = '<h3 style="font-size:16px;margin:20px 0 10px;color:#333;">Priorytety do poprawy</h3>';

    foreach (array_slice($priorities, 0, 5) as $i => $priority) {
        $text = htmlspecialchars(is_string($priority) ? $priority : ($priority['text'] ?? $priority['label'] ?? ''));
        $num  = $i + 1;
        $html .= "<div class='priority-item'><strong>{$num}.</strong> {$text}</div>";
    }

    return $html;
}
