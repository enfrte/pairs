<?php

require __DIR__ . '/../../pairs_root/vendor/autoload.php'; // autoload the classes

use Pairs\Classes\Controllers\HomeController;
use Pairs\Classes\Controllers\AccessController;
use Pairs\Classes\Controllers\InstallController;
use Latte\Engine as LatteEngine;
use flight\net\Response;
use flight\database\PdoWrapper;
use Pairs\Classes\Controllers\NewPairController;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$app = Flight::app();

// HOST SETTINGS
$app->set('basePath', Flight::request()->base . ''); // Host: XAMPP local dev

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

Flight::map('configData', function() {
    static $config;
    if (!$config) {
        $config = require __DIR__ . '/../../pairs_root/config.php';
    }
    return $config;
});

$app->register('latte', LatteEngine::class, [], function(LatteEngine $latte) use ($app) {
    $latte->setTempDirectory(__DIR__ . '/cache');
    // Tell Latte where the root directory for your views will be at.
    $latte->setLoader(new \Latte\Loaders\FileLoader('templates'));
});

// Return custom htmx responses
Flight::map('htmxResponse', function() {
    return new class extends Response {
        public function sendHtml($html) {
            $this->header('Content-Type', 'text/html');
            $this->write($html);
            $this->send();
        }
    };
});


Flight::map('isHxRequest', function() {
    return Flight::request()->getHeader('HX-Request') === 'true';
});

// Register the PDO helper class
Flight::register('db', PdoWrapper::class, ['sqlite:database.sqlite', '', '', [
    // PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'utf8mb4\'',
    // PDO::ATTR_EMULATE_PREPARES => false,
    // PDO::ATTR_STRINGIFY_FETCHES => false,
    // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]]);

Flight::route('/', [AccessController::class, 'index']);
Flight::route('/login', [AccessController::class, 'login']);
Flight::route('/logout', [AccessController::class, 'logout']);
Flight::route('/home', [HomeController::class, 'index']);
Flight::route('/install', [InstallController::class, 'index']);
Flight::route('/wordPairForm', [NewPairController::class, 'index']);
Flight::route('/insertWordPair', [NewPairController::class, 'insertWordPair']);

Flight::start();

?>
