<?php

namespace App\Core;

use function FastRoute\simpleDispatcher;

class Router {

	private $dispatcher;

	function __construct() {
		header( "Access-Control-Allow-Origin: *" );
		header( "Content-Type: application/json; charset=UTF-8" );
		header( "Access-Control-Allow-Methods: GET, POST, PUT, DELETE" );
		header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );
		header( "Access-Control-Expose-Headers: Authorization" );

		$this->build_routes();
	}

	private function build_routes() {
		$routes = require( DIR_INCLUDES . 'routes.php' );

		if ( ! $routes ) {
			return;
		}

		$this->dispatcher = simpleDispatcher( function ( $r ) use ( $routes ) {
			foreach ( $routes as $route ) {
				$r->addRoute( $route[0], $route[1], $route[2] );
			}
		} );

	}

	public function dispatch_routes() {
		$http_method = $_SERVER['REQUEST_METHOD'];
		$uri         = $_SERVER['REQUEST_URI'];

		// OPTIONS Method
		if ($http_method === 'OPTIONS') {
			http_response_code(200);
			exit;
		}

		// Strip query string (?foo=bar) and decode URI
		if ( false !== $pos = strpos( $uri, '?' ) ) {
			$uri = substr( $uri, 0, $pos );
		}

		$uri = rawurldecode( $uri );

		$route_info = $this->dispatcher->dispatch( $http_method, $uri );

		switch ( $route_info[0] ) {
			case \FastRoute\Dispatcher::NOT_FOUND:
				send_http_error( 404, 'Not Found' );
				break;

			case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
				$allowedMethods = $route_info[1];
				send_http_error( 405, 'Method not allowed' );
				break;

			case \FastRoute\Dispatcher::FOUND:
				$handler = $route_info[1];
				$vars    = $route_info[2];
				if ( is_callable( $handler ) ) {
					if ($http_method !== 'GET') {
						$data = get_http_request_data();
						call_user_func($handler, $data, $vars);
					}
					else {
						call_user_func( $handler, $vars );
					}

				}
				break;

		}
	}

}