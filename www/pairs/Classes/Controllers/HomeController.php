<?php

namespace Pairs\Classes\Controllers;

// use Pairs\Classes\Translate; 
// use Smarty\Smarty;
use Flight;
use Pairs\Classes\Security;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class HomeController
{
    public function __construct() {
        // Bounce the user if they aren't logged in
        Security::authCheck();
    }
    
    public function index()
    {
        Flight::latte()->render('home.latte', []);
    }

    // Select a game based on a category and language
    public function selectGame($category, $language) {
        // Query the word pairs table based on the category and language
        $sql = 'SELECT * FROM word_pairs WHERE category = :category AND language = :language';
        $wordPairs = Flight::db()->fetch($sql, [':category' => $category, ':language' => $language]);

        // send json data
        Flight::json(['wordPairs' => $wordPairs]);
        // Flight::latte()->render('select-game.latte', []);
    }

}
