<?php

namespace Pairs\Classes\Controllers;

use Flight;
use Pairs\Classes\Security;
use Pairs\Classes\HtmxResponse;


class AccessController
{
    public function index()
    {	
		if (Security::isAuthenticated()) {
			Flight::redirect('/home');
		}
		else {
			Flight::latte()->render('access.latte');
		}
    }

	public function login()
	{
		$submitted_password = !empty($_POST['password']) ? $_POST['password'] : false;
		$config = Flight::configData();

		if ($submitted_password && ($submitted_password == $config['app_password'] || Security::isAuthenticated())) {
			$_SESSION['logged_in'] = true;
			Flight::redirect('/home');
		}
		else {
			HtmxResponse::renderNotification('Could not login', 'danger');
		}
	}

	function logout() {
		$_SESSION['logged_in'] = false;
		Flight::latte()->render('access.latte');
	}
}