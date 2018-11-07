<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST' ||
    !isset($_REQUEST['vote']) ||
    count($_REQUEST) !== 1) {

    header('HTTP/1.1 404 Not Found');
    die;
}

$button_id = $_REQUEST['vote'];
$stats_json = file_get_contents(__DIR__ . '/stats.json');
$stats = json_decode($stats_json, true);

if (!isset($stats[$button_id])) {
    header('HTTP/1.1 404 Not Found');
    die;
}

$stats[$button_id]['votes']++;
$stats_json = json_encode($stats, JSON_PRETTY_PRINT);
$success = file_put_contents(__DIR__ . '/stats.json', $stats_json, LOCK_EX);
if ($success === FALSE) {
    header('HTTP/1.1 500 Internal Server Error');
    die;
}

echo $stats[$button_id];
