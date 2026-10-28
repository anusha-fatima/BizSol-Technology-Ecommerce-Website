<?php
// Saves a quotation request and emails it. Needs PHP (included with Hostinger hosting).
header('Content-Type: application/json');
$to = 'm.yousufakhter@gmail.com';
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !empty($_POST['website'])) { http_response_code(400); exit('{"ok":false}'); }
$c = function ($k, $n = 200) { return substr(trim(strip_tags($_POST[$k] ?? '')), 0, $n); };
$name = $c('name'); $phone = $c('phone', 30); $city = $c('city'); $addr = $c('address', 300); $email = $c('email'); $co = $c('company');
$note = $c('note', 1000); $pref = $c('pref', 20); $ref = preg_replace('/[^A-Z0-9-]/', '', $_POST['ref'] ?? '');
$items = json_decode($_POST['items'] ?? '[]', true);
if (!$name || !$phone || !$city || !$addr || !is_array($items) || !count($items) || count($items) > 50 || ($email && !filter_var($email, FILTER_VALIDATE_EMAIL))) { http_response_code(422); exit('{"ok":false}'); }
// simple rate limit: one request per 20 seconds per visitor
$f = sys_get_temp_dir() . '/bz_' . md5($_SERVER['REMOTE_ADDR'] ?? 'x');
if (file_exists($f) && time() - filemtime($f) < 20) { http_response_code(429); exit('{"ok":false}'); }
touch($f);
$lines = '';
foreach ($items as $i) { $lines .= '- ' . substr(strip_tags($i['name'] ?? ''), 0, 120) . ' x ' . max(1, min(999, (int)($i['q'] ?? 1))) . "\n"; }
$body = "Ref: $ref\nName: $name\nCompany: $co\nPhone: $phone\nEmail: $email\nCity: $city\nAddress: $addr\nPreferred contact: $pref\n\nItems:\n$lines\nNotes: $note\n";
$saved = file_put_contents(__DIR__ . '/enquiries.log', date('c') . "\n$body---\n", FILE_APPEND | LOCK_EX);
$host = preg_replace('/[^a-z0-9.-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
@mail($to, "New order $ref", $body, "From: no-reply@$host\r\nReply-To: " . ($email ?: $to));
echo json_encode(['ok' => $saved !== false]);
