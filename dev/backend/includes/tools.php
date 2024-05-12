<?php

function send_http_error( $error_code, $error_message, $error_details = [] ) {
	header( "Content-Type: application/json; charset=UTF-8" );
	http_response_code( $error_code );
	$response_data = [
		'error' => [
			'code'    => $error_code,
			'message' => $error_message,
			'details' => $error_details,
		]
	];

	print json_encode( $response_data );
	die;
}


function send_http_response( $data ) {
	header( "Content-Type: application/json; charset=UTF-8" );
	print json_encode( $data );
	die;
}

function get_http_request_data() {

	$request_method = $_SERVER['REQUEST_METHOD'];
	$data           = array();

	switch ( $request_method ) {
		case 'PUT':
		case 'POST':
			$data = file_get_contents( 'php://input' );
			$data = json_decode( $data, true );
			break;

		case 'GET':
			$data = $_GET;
			break;
	}

	return $data;

}

function get_authorization_http_header(): ?string {
	$authorization_header = null;

	if ( isset( $_SERVER['HTTP_X_AUTHORIZATION'] ) ) { //Nginx or fast CGI
		return trim( $_SERVER["HTTP_X_AUTHORIZATION"] );
	}

	if ( function_exists( 'apache_request_headers' ) ) {
		$requestHeaders = apache_request_headers();
		$requestHeaders = array_combine( array_map( 'ucwords', array_keys( $requestHeaders ) ), array_values( $requestHeaders ) );

		if ( isset( $requestHeaders['X-Authorization'] ) ) {
			$authorization_header = trim( $requestHeaders['X-Authorization'] );
		}
	}

	return $authorization_header;
}

function get_bearer_token(): ?string {
	$headers = get_authorization_http_header();
	if ( ! empty( $headers ) ) {
		if ( preg_match( '/Bearer\s(\S+)/', $headers, $matches ) ) {
			return $matches[1];
		}
	}

	return null;
}


function message_extract_json_error( $message ) {
	$regexp   = "/response\:\s+(\{.+?\})$/is";
	$json_str = null;

	if ( preg_match( $regexp, $message, $matches ) ) {
		$json_str = $matches[1];
	}

	return ( json_decode( $json_str, true ) );

}


function get_token_manager(): ?\App\Core\TokenManager {
	static $token_manager = null;

	if ( ! $token_manager ) {
		$token_manager = new \App\Core\TokenManager();
	}

	return $token_manager;
}

function get_mail_manager(): \App\Core\MailManager {
	static $mail_manager = null;

	if ( ! $mail_manager ) {
		$mail_manager = new \App\Core\MailManager();
	}

	return $mail_manager;

}

function get_route_manager(): \App\Core\Router {
	static $router = null;

	if (!$router) {
		$router = new \App\Core\Router();
	}

	return $router;

}

function build_endpoint( $route ): string {
	return APP_API_ENDPOINT . $route;
}


function send_default_http_header_response() {
	header( "Access-Control-Allow-Origin: *" );
	header( "Content-Type: application/json; charset=UTF-8" );
	header( "Access-Control-Allow-Methods: GET, POST, PUT, DELETE" );
	header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Authorization, X-Requested-With" );
	header( "Access-Control-Expose-Headers: X-Authorization" );

}