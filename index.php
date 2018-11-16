<?php
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/functions.php';

$context = [];

$context['participants'] = [
    ['name' => 'tobija', 'display' => 'Tobija'],
    ['name' => 'andre', 'display' => 'André'],
    ['name' => 'jonas', 'display' => 'Jonas'],
    ['name' => 'alina', 'display' => 'Aline'],
    ['name' => 'cedrine', 'display' => 'Cédrine'],
    ['name' => 'nathalie', 'display' => 'Nathalie'],
    ['name' => 'marvin', 'display' => 'Marvin'],
    ['name' => 'rouven', 'display' => 'Rouven'],
    ['name' => 'maurice', 'display' => 'Maurice'],
];

shuffle($context['participants']);

$assets_json = my_file_get_contents(__DIR__ . '/webpack-assets.json');
if ($assets_json !== FALSE) {
    $context['assets'] = json_decode($assets_json)->main;
}

$stats_json = my_file_get_contents(__DIR__ . '/stats.json');
if ($stats_json !== FALSE) {
    $context['stats'] = json_decode($stats_json, true);
}

$twig_loader = new \Twig_Loader_Filesystem(__dir__ . '/view');
$twig = new \Twig_Environment($twig_loader, array(
    'autoescape' => false,
    'debug' => true,
));
$twig->addExtension(new \Twig_Extension_Debug());

$twig->display('home.twig', $context);
