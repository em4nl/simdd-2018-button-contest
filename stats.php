<?php
include_once __DIR__ . '/functions.php';

function unlock() {
    global $is_locked;
    global $stats_fh;
    if (isset($is_locked) && $is_locked && isset($stats_fh)) {
        return flock($stats_fh, LOCK_UN);
    }
    return TRUE;
}

function error_404() {
    unlock();
    header('HTTP/1.1 404 Not Found');
    die;
}

function error_500() {
    unlock();
    header('HTTP/1.1 500 Internal Server Error');
    die;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' ||
    !isset($_REQUEST['vote']) ||
    count($_REQUEST) !== 1) {

    error_404();
}

$name = $_REQUEST['vote'];

$stats_path = __DIR__ . '/stats.json';
$is_locked = FALSE;

$stats_fh = my_fopen($stats_path, 'r+');

if ($stats_fh === FALSE) error_500();

$success = flock($stats_fh, LOCK_EX);
if (!$success) error_500();
$is_locked = TRUE;

$stats_json = fread($stats_fh, filesize($stats_path));
rewind($stats_fh);
if ($stats_json !== FALSE) $stats = json_decode($stats_json, true);

if (!isset($stats) || !is_array($stats)) error_500();
if (!isset($stats[$name])) error_404();

$stats[$name]++;
$stats_json = json_encode($stats, JSON_PRETTY_PRINT);
if ($stats_json === FALSE) error_500();

if (ftruncate($stats_fh, 0) === FALSE) error_500();
rewind($stats_fh);

if (fwrite($stats_fh, $stats_json) === FALSE) error_500();

if (!unlock()) error_500();

echo $stats_json;
