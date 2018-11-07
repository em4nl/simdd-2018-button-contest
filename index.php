<?php
require_once 'vendor/autoload.php';

$json = file_get_contents(__dir__ . '/webpack-assets.json');
$context['assets'] = json_decode($json)->main;

$twig_loader = new \Twig_Loader_Filesystem(__dir__ . '/view');
$twig = new \Twig_Environment($twig_loader, array(
    'autoescape' => false,
    'debug' => true,
));
$twig->addExtension(new \Twig_Extension_Debug());

function compile($template, $env) {
    global $twig;
    return $twig->render($template, $env);
}

echo compile('home.twig', $context);
