<?php

use App\RouteHandler;

return [
	[ 'POST', build_endpoint( '/login' ), [ RouteHandler::class, 'login' ] ],
	[ 'GET', build_endpoint( '/get-accounts/{domain}' ), [ RouteHandler::class, 'get_accounts' ] ],
	[ 'POST', build_endpoint( '/change-password' ), [ RouteHandler::class, 'change_password' ] ],
];