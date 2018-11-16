<?php
include_once __DIR__ . '/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' ||
    !isset($_REQUEST['vote']) ||
    count($_REQUEST) !== 1) {

    header('HTTP/1.1 404 Not Found');
    die;
}

$name = $_REQUEST['vote'];
$stats_json = my_file_get_contents(__DIR__ . '/stats.json');
if ($stats_json !== FALSE) {
    $stats = json_decode($stats_json, true);
}

if (!isset($stats) || !isset($stats[$name])) {
    header('HTTP/1.1 404 Not Found');
    die;
}

$stats[$name]++;
$stats_json = json_encode($stats, JSON_PRETTY_PRINT);
$success = file_put_contents(__DIR__ . '/stats.json', $stats_json, LOCK_EX);
if ($success === FALSE) {
    header('HTTP/1.1 500 Internal Server Error');
    die;
}

echo $stats_json;
