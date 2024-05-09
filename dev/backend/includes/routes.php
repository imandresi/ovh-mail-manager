<?php

use App\RouteHandler;

return [
	[ 'POST', '/login', [ RouteHandler::class, 'login' ] ],
	[ 'GET', '/get-accounts/{domain}', [ RouteHandler::class, 'get_accounts' ] ],
	[ 'GET', '/check-logged-in', [ RouteHandler::class, 'check_logged_in' ] ],
	[ 'POST', '/change-password', [ RouteHandler::class, 'change_password' ] ],
];