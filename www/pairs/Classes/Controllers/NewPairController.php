<?php

namespace Pairs\Classes\Controllers;

use Flight;
use Pairs\Classes\Security;
use Exception;

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

    public function insertWordPair()
    {
        try {
            $useTabSeparation = Flight::request()->data->useTabSeparation;
            $separationCharacters = Flight::request()->data->separationCharacters;

            if (!$useTabSeparation && !$separationCharacters) {
                throw new Exception("No separation characters");
            }

            $language_1 = Flight::request()->data->language_1;
            $language_2 = Flight::request()->data->language_2;

            if (!$language_1 || !$language_2) {
                throw new Exception("No language selected");
            }

            $category_id = Flight::request()->data->category_id; 
            $new_category = Flight::request()->data->new_category;

            $db = Flight::db();
            $db->beginTransaction();

            if ($new_category) {
                $db->runQuery("INSERT INTO categories (name) VALUES (?)", [$new_category]);
                $category_id = $db->lastInsertId();
            }

            if (!$category_id) {
                $category_id = 0;
            }
        
            if ($useTabSeparation) {
                $separator = "\t";
            } else {
                $separator = $separationCharacters;
            }
            
            $pairs = Flight::request()->data->pairs;
            $pairs = explode("\n", $pairs);
            
            foreach ($pairs as $line) {
                if (strpos($line, $separator) === false) {
                    throw new Exception("Invalid separator: {$line}");
                }
                
                $words = explode($separator, $line);
                $language_1_word = trim($words[0]);
                $language_2_word = trim($words[1]);

                $db->runQuery(
                    "INSERT INTO word_pairs (language_1, language_1_word, language_2, language_2_word, category_id) 
                    VALUES 
                    (?, ?, ?, ?, ?)", 
                    [$language_1,  $language_1_word, $language_2,  $language_2_word,  $category_id ]
                );
            }

            $db->commit();
        } catch (Exception $e) {
            $db->rollBack();
            throw $e;
        }

        Flight::redirect('/home');
    }

}
