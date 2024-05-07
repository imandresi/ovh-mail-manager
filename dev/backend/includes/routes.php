<?php

use App\RouteHandler;

return [
	[ 'GET', '/', [ RouteHandler::class, 'default' ] ],
	[ 'GET', '/login/{domain}/create', [ RouteHandler::class, 'login' ] ]
];