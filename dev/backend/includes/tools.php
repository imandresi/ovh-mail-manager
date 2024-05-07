<?php

function send_http_error( $error_code, $error_message, $error_details = '' ) {
	header( "Content-Type: application/json; charset=UTF-8" );
	http_response_code( $error_code );
	$response_data = [
		'code'    => $error_code,
		'message' => $error_message,
		'details' => $error_details
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


function save_log( $data, $label = '' ) {
	$data = print_r( $data, true );
	$data = "\n\n-----------: $label\n" . $data;
	file_put_contents( 'd:/temp.txt', $data, FILE_APPEND );

}