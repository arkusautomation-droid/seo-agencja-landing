<?php
/**
 * Stripe Webhook Handler — POST /api/webhook-stripe.php
 *
 * Verifies Stripe webhook signature.
 * Handles: checkout.session.completed, invoice.paid
 * Logs events to SQLite.
 * Sends notification email to admin.
 *
 * mastermarketing.io/seo-oferta
 */

require_once __DIR__ . '/config.php';

// No CORS for webhooks (server-to-server)
header('Content-Type: application/json; charset=utf-8');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Metoda niedozwolona.', 405);
}

// ── Read Raw Payload ────────────────────────────────────────────────────────

$payload = file_get_contents('php://input');

if (empty($payload)) {
    jsonError('Brak danych.', 400);
}

// ── Verify Stripe Signature ─────────────────────────────────────────────────

$sigHeader = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

if (empty($sigHeader)) {
    error_log('Stripe webhook: missing signature header');
    jsonError('Brak nagłówka podpisu Stripe.', 401);
}

/**
 * Verify Stripe webhook signature (v1).
 * Implements the same algorithm as Stripe's SDK.
 */
function verifyStripeSignature(string $payload, string $sigHeader, string $secret, int $tolerance = 300): bool
{
    // Parse the signature header
    $parts = [];
    foreach (explode(',', $sigHeader) as $item) {
        $kv = explode('=', trim($item), 2);
        if (count($kv) === 2) {
            $parts[$kv[0]][] = $kv[1];
        }
    }

    $timestamp  = $parts['t'][0] ?? null;
    $signatures = $parts['v1'] ?? [];

    if (!$timestamp || empty($signatures)) {
        return false;
    }

    // Check timestamp tolerance (prevent replay attacks)
    if (abs(time() - (int) $timestamp) > $tolerance) {
        error_log('Stripe webhook: timestamp outside tolerance');
        return false;
    }

    // Compute expected signature
    $signedPayload   = $timestamp . '.' . $payload;
    $expectedSig     = hash_hmac('sha256', $signedPayload, $secret);

    // Compare with provided signatures
    foreach ($signatures as $sig) {
        if (hash_equals($expectedSig, $sig)) {
            return true;
        }
    }

    return false;
}

// Skip verification if using placeholder secret (development mode)
$isDevMode = str_contains(STRIPE_WEBHOOK_SECRET, 'PLACEHOLDER');

if (!$isDevMode) {
    if (!verifyStripeSignature($payload, $sigHeader, STRIPE_WEBHOOK_SECRET)) {
        error_log('Stripe webhook: signature verification failed');
        jsonError('Nieprawidłowy podpis.', 401);
    }
}

// ── Parse Event ─────────────────────────────────────────────────────────────

$event = json_decode($payload, true);

if (!$event || !isset($event['type'])) {
    jsonError('Nieprawidłowy format wydarzenia.', 400);
}

$eventType = $event['type'];
$eventId   = $event['id'] ?? '';

// Only handle events we care about
$handledEvents = [
    'checkout.session.completed',
    'invoice.paid',
    'payment_intent.succeeded',
];

if (!in_array($eventType, $handledEvents, true)) {
    // Acknowledge but don't process
    jsonSuccess(['message' => "Event {$eventType} acknowledged but not processed."]);
}

// ── Extract Data ────────────────────────────────────────────────────────────

$data = $event['data']['object'] ?? [];

$sessionId     = $data['id'] ?? '';
$customerEmail = $data['customer_email'] ?? $data['customer_details']['email'] ?? $data['receipt_email'] ?? '';
$amount        = $data['amount_total'] ?? $data['amount_paid'] ?? $data['amount'] ?? 0;
$currency      = $data['currency'] ?? 'pln';
$metadata      = json_encode($data['metadata'] ?? [], JSON_UNESCAPED_UNICODE);

// For invoice.paid, extract from different structure
if ($eventType === 'invoice.paid') {
    $customerEmail = $data['customer_email'] ?? $customerEmail;
    $amount        = $data['amount_paid'] ?? $amount;
}

// ── Store in Database ───────────────────────────────────────────────────────

try {
    $db = getDB();

    $stmt = $db->prepare('
        INSERT INTO stripe_events (
            event_type, event_id, session_id, customer_email,
            amount, currency, metadata, created_at
        ) VALUES (
            :event_type, :event_id, :session_id, :customer_email,
            :amount, :currency, :metadata, datetime("now")
        )
    ');

    $stmt->execute([
        ':event_type'     => $eventType,
        ':event_id'       => $eventId,
        ':session_id'     => $sessionId,
        ':customer_email' => $customerEmail,
        ':amount'         => $amount,
        ':currency'       => strtolower($currency),
        ':metadata'       => $metadata,
    ]);

    $recordId = $db->lastInsertId();

} catch (PDOException $e) {
    error_log('Stripe webhook DB error: ' . $e->getMessage());
    jsonError('Błąd zapisu zdarzenia.', 500);
}

// ── Send Admin Notification ─────────────────────────────────────────────────

$amountFormatted = number_format($amount / 100, 2, ',', ' ') . ' ' . strtoupper($currency);

$eventLabel = match ($eventType) {
    'checkout.session.completed' => 'Zamówienie zakończone',
    'invoice.paid'               => 'Faktura opłacona',
    'payment_intent.succeeded'   => 'Płatność zrealizowana',
    default                      => $eventType,
};

$adminHtml = '
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8">' . getEmailStyles() . '</head>
<body>
<div class="container">
    <div class="header" style="background:linear-gradient(135deg,#22c55e,#10b981);">
        <h1>💰 ' . htmlspecialchars($eventLabel) . '</h1>
        <p>Stripe Event — ' . date('d.m.Y H:i') . '</p>
    </div>
    <div class="body">
        <table class="info-table">
            <tr><td>Typ zdarzenia</td><td><strong>' . htmlspecialchars($eventType) . '</strong></td></tr>
            <tr><td>Event ID</td><td><code style="font-size:12px;">' . htmlspecialchars($eventId) . '</code></td></tr>
            <tr><td>Session ID</td><td><code style="font-size:12px;">' . htmlspecialchars($sessionId) . '</code></td></tr>
            <tr><td>Email klienta</td><td><a href="mailto:' . htmlspecialchars($customerEmail) . '">' . htmlspecialchars($customerEmail) . '</a></td></tr>
            <tr><td>Kwota</td><td><strong style="color:#22c55e;font-size:18px;">' . $amountFormatted . '</strong></td></tr>
        </table>

        <p style="font-size:13px;color:#888;margin-top:20px;">
            Pełne dane zdarzenia dostępne w
            <a href="https://dashboard.stripe.com/events/' . htmlspecialchars($eventId) . '" style="color:#6037FF;">Stripe Dashboard</a>.
        </p>
    </div>
    <div class="footer">
        <p>Master Marketing Stripe Webhook System</p>
    </div>
</div>
</body>
</html>
';

$emailResult = sendEmail(
    ADMIN_EMAIL,
    "[STRIPE] {$eventLabel} — {$amountFormatted} — {$customerEmail}",
    $adminHtml
);

if ($emailResult !== true) {
    error_log("Stripe webhook admin email failed: {$emailResult}");
}

// ── Success — Stripe expects 2xx ────────────────────────────────────────────

jsonSuccess([
    'event_type' => $eventType,
    'record_id'  => (int) $recordId,
]);
