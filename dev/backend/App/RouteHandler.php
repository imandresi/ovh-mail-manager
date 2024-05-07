<?php

namespace App;

class RouteHandler {

	public static function default() {
		die ('Default route works');
	}

	public static function login($domain) {
		var_dump($domain);
		die ('Login route works');
	}

}