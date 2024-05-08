<?php

use App\Core\Router;

require_once( 'includes/common.php' );

$router = new Router();
$router->dispatch_routes();

