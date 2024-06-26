<?php

define( 'DIR_ROOT', dirname( __DIR__, 1 ) . '/' );
define( 'DIR_INCLUDES', DIR_ROOT . 'includes/' );
define( 'DIR_VENDOR', DIR_ROOT . 'vendor/' );
define( 'DIR_TEMPLATES', DIR_ROOT . 'templates/' );
define( 'DIR_APP', DIR_ROOT . 'app/' );

ini_set( 'display_errors', 1 );
ini_set( 'display_startup_errors', 1 );
error_reporting( E_ALL );

require_once( DIR_VENDOR . 'autoload.php' );
require_once( DIR_ROOT . 'config.php' );
require_once( 'tools.php' );
