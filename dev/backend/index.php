<?php

use App\Core\Router;

require_once( 'includes/common.php' );

get_token_manager();

$router = new Router();
$router->dispatch_routes();

