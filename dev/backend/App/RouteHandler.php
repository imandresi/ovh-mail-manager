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
			$error_details = message_extract_json_error( $error_message );
			send_http_error( 400, $error_message, $error_details );
		}
	}

	public static function login( $http_data ) {
		get_token_manager()->revoke_authorization();

		if (
			(!isset($http_data['username'])) ||
			(!isset($http_data['password'])) ||
			( LOGIN_USERNAME != $http_data['username'] ) ||
			( LOGIN_PASSWORD != $http_data['password'] )
		) {
			send_http_error( 401, 'Invalid username or password' );
		}

		$token = get_token_manager()->create_token();

		send_http_response( [
			'success'    => true,
			'domainName' => DOMAIN_NAME,
		] );

	}

	public static function check_logged_in() {
		$logged_in = get_token_manager()->verify_token();
		if ( ! $logged_in ) {
			send_http_error( 401, 'Invalid credentials' );
		}

		send_http_response( [
			'domainName' => DOMAIN_NAME
		] );
	}

	public static function change_password( $http_data ) {
		try {
			$result = get_mail_manager()->change_password(
				$http_data['domain'],
				$http_data['account'],
				$http_data['password']
			);
		} catch ( \Exception $e ) {
			$error_code    = $e->getCode();
			$error_message = $e->getMessage();
			$error_details = message_extract_json_error( $error_message );

			send_http_error( 400, "($error_code) $error_message", $error_details );
		}

		$email = $http_data['account'] . '@' . $http_data['domain'];
		send_http_response( [
			"success" => true,
			"message" => "Password changed successfully for: $email"
		] );

	}

}