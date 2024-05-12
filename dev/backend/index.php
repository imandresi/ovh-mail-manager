<?php

use App\Core\Router;

require_once( 'includes/common.php' );

send_default_http_header_response();

if ( in_array( $_SERVER['REQUEST_METHOD'], [ 'GET', 'POST' ] ) ) {
	try {
		// Process routing
		get_route_manager()->dispatch_routes();

	} catch ( Exception $e ) {
		$error_code    = $e->getCode();
		$error_message = $e->getMessage();
		send_http_error( $error_code, $error_message );
	}
}