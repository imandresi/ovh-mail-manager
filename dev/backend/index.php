<?php

require_once( 'includes/common.php' );


function process_request(): void {
	$api = new Api();

	$data   = get_http_request_data();
	$action = $data['action'] ?? '';

	if ( ! $action ) {
		return;
	}

	$api_map = [
		'login' => [
			'method'   => 'POST',
			'callback' => array( $api, 'login' ),
			'params' => []
		]
	];

	// Does the action exist ?
	if ( ! isset( $api_map[ $action ] ) ) {
		send_http_error( 404, 'Resource not found' );
	}

	// Is the method allowed ?
	$request_method = $_SERVER['REQUEST_METHOD'];
	if ($api_map[$action]['method'] !== $request_method) {
		send_http_error(405, 'Method not allowed');
	}

	// Execute the callback
	$params = $api_map[$action]['params'] ?? [];
	$params = array_merge([$data], $params);
	call_user_func_array($api_map[$action]['callback'], $params);

}

process_request();