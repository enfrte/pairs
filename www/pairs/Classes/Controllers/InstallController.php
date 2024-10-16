<?php

namespace Pairs\Classes\Controllers;

use Flight;
use PDO;
use Pairs\Classes\Security;
// use Pairs\Classes\ToastException;
use Pairs\Classes\HtmxResponse;
use Exception;


class InstallController 
{
	public function index()
	{
		ini_set('display_errors', 1);
		ini_set('display_startup_errors', 1);
		error_reporting(E_ALL);

		Security::authCheck();

		if ( empty($_SESSION['logged_in']) || $_SESSION['logged_in'] == false ) { 
			die('Requires access.');
		}

		$result = "Unknown!";
	
		try {
			$schema_file = __DIR__ . '/../../schema.sql';
			$schema = file_get_contents($schema_file); 

			if ( empty($schema) ) {
				throw new \Exception("Could not get contents of schema file");
			}

			$db = Flight::db();
			// Note: SQLite operation errors are not thrown as exceptions, so existing tables and constraint violations will be ignored.
			$db->beginTransaction(); 
			// Split the schema file into individual statements
			$statements = array_filter(array_map('trim', explode(';', $schema)));

			// Execute each statement in the schema
			foreach ($statements as $statement) {
				if ($statement) {
					try {
						$result = $db->exec($statement.';');
						echo <<<HTML
							<hr>
							<p>Executed statement successfully: {$statement} </p>
						HTML;
					} catch (Exception $e) {
						echo <<<HTML
							<hr>
							<pre>Error executing statement: {$statement}</pre>
							<p>SQLite Error: {$e->getMessage()}</p>
						HTML;
					}
				}
			}

			if ($db->commit()) {  
				$result = "<hr>Finished!";
			} else {
				$db->rollBack();  
				throw new \Exception('Error: Unable to execute schema file.');
			}

			echo $result;
		}
		catch (\Exception $e) {
			// new ToastException($e);
			HtmxResponse::renderNotification($e->getMessage(), 'danger');
		}
		catch (\Throwable $t) {
			echo 'Throwable caught: ';
			echo $t->getMessage();
		}
	}

}
