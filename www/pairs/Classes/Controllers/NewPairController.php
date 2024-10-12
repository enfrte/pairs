<?php

namespace Pairs\Classes\Controllers;

use Flight;
use Pairs\Classes\Security;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class NewPairController
{
    public function __construct() {
        Security::authCheck();
    }
    
    public function index()
    {
        Flight::latte()->render('word-pair-form.latte', []);
    }

}
