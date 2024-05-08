<?php

namespace App;
class Api {
	private MailManager $mail_manager;

	/**
	 * constructor
	 */
	public function __construct() {
		header( "Access-Control-Allow-Origin: *" );
		header( "Content-Type: application/json; charset=UTF-8" );
		header( "Access-Control-Allow-Methods: GET, POST, PUT, DELETE" );
		header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

		$this->mail_manager = new MailManager();
	}


	public function check_logged_in($data) {
		$logged_in = isset($_SESSION['domainName']) && $_SESSION['domainName'];

		if (!$logged_in) {
			send_http_error(401, 'User session has expired or authentication token is invalid.');
		}

		send_http_response([
			'domainName' => DOMAIN_NAME
		]);

	}



	private function init_login_session() {
		$_SESSION['domainName'] = DOMAIN_NAME;
	}

	private function clear_login_session() {
		session_unset();
	}

}