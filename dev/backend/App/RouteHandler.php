<?php

namespace App;

class RouteHandler {

	public static function get_accounts( $vars ) {
		$domain = $vars['domain'];

		if ( DOMAIN_NAME !== $domain ) {
			send_http_error( 400, 'Bad Request - Incorrect Domain' );
		}

		try {
			$accounts = get_mail_manager()->get_accounts( $domain, EXCLUDE_ACCOUNTS );
			send_http_response( $accounts );
		} catch ( \Exception $e ) {
			$error_message = $e->getMessage();
			$error_code    = $e->getCode();
			send_http_error( 400, "$error_code: $error_message" );
		}
	}

	public static function login( $http_data ) {
		get_token_manager()->revoke_authorization();

		if ( ( LOGIN_USERNAME != $http_data['username'] ) || ( LOGIN_PASSWORD != $http_data['password'] ) ) {
			send_http_error( 401, 'Invalid username or password' );
		}

		$token = get_token_manager()->create_token();

		send_http_response( [
			'domainName'         => DOMAIN_NAME,
			'authorizationToken' => $token
		] );

	}

	public static function check_logged_in() {
		$logged_in = get_token_manager()->verify_token();
		if (!$logged_in) {
			send_http_error(401, 'Invalid credentials');
		}

		send_http_response([
			'domainName' => DOMAIN_NAME
		]);
	}

}