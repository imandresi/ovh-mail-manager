<?php

namespace App\Core;

use function FastRoute\simpleDispatcher;

class Router {

	private $dispatcher;

	function __construct() {
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

		// Strip query string (?foo=bar) and decode URI
		if ( false !== $pos = strpos( $uri, '?' ) ) {
			$uri = substr( $uri, 0, $pos );
		}

		$uri = rawurldecode( $uri );

		$route_info = $this->dispatcher->dispatch( $http_method, $uri );

		switch ( $route_info[0] ) {
			case \FastRoute\Dispatcher::NOT_FOUND:
				die( 'ERROR 404 - Not Found' );
				break;

			case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
				$allowedMethods = $route_info[1];
				die( 'ERROR 405 - Method not allowed' );
				break;

			case \FastRoute\Dispatcher::FOUND:
				$handler = $route_info[1];
				$vars    = $route_info[2];
				if ( is_callable( $handler ) ) {
					call_user_func_array( $handler, $vars );
				}
				break;

		}
	}

}