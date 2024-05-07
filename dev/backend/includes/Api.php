<?php

class Api {

	/**
	 * constructor
	 */
	public function __construct() {
		header( "Access-Control-Allow-Origin: *" );
		header( "Content-Type: application/json; charset=UTF-8" );
		header( "Access-Control-Allow-Methods: GET, POST, PUT, DELETE" );
		header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );
	}

	public function login($data) {
		if ( ( LOGIN_USERNAME != $data['username'] ) || ( LOGIN_PASSWORD != $data['password'] ) ) {
			send_http_error(401, 'Invalid username or password');
		}

		send_http_response(DOMAIN_NAME);

	}

}