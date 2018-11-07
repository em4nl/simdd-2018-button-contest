<?php
require_once __DIR__ . '/vendor/autoload.php';

$assets_json = file_get_contents(__DIR__ . '/webpack-assets.json');
$context['assets'] = json_decode($assets_json)->main;

$stats_json = file_get_contents(__DIR__ . '/stats.json');
$context['stats'] = json_decode($stats_json, true);

$twig_loader = new \Twig_Loader_Filesystem(__dir__ . '/view');
$twig = new \Twig_Environment($twig_loader, array(
    'autoescape' => false,
    'debug' => true,
));
$twig->addExtension(new \Twig_Extension_Debug());

$twig->display('home.twig', $context);
