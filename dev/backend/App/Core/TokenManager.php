<?php

namespace App\Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenManager {

//	const TOKEN_EXPIRATION_TIME = 60 * 60;
	const TOKEN_EXPIRATION_TIME = 60;

	private string $token;
	private string $secret_key;

	/**
	 * Constructor
	 */
	public function __construct( $secret_key = AUTH_SECRET_KEY ) {
		$this->token      = '';
		$this->secret_key = $secret_key;

		$this->verify_token();
	}

	public function create_token(): string {
		$this->token = '';

		$payload_claim_iat = time();
		$payload_claim_exp = $payload_claim_iat + self::TOKEN_EXPIRATION_TIME; // 1 hour validity

		$payload = [
			'iss' => $_SERVER['HTTP_HOST'] ?? '',
			'aud' => $_SERVER['HTTP_REFERER'] ?? '',
			'iat' => $payload_claim_iat,
			'exp' => $payload_claim_exp,
		];

		$this->token = JWT::encode( $payload, $this->secret_key, 'HS256' );

		$this->inject_token_in_header();

		return $this->token;
	}

	public function inject_token_in_header() {
		if ( $this->token ) {
			header( "Authorization: {$this->token}" );
		}
	}

	public function revoke_authorization() {
		$this->token = '';
		header_remove( 'Authorization' );
	}

	public function extract_token_from_header(): string {
		$this->token = get_bearer_token() ?? '';

		return $this->token;
	}

	public function verify_token( $token = null ): bool {

		// check if token is in the header
		if ( ! $token ) {
			$token = $this->extract_token_from_header();
		}

		if ( ! $token ) {
			return false;
		}

		// decode token
		try {
			JWT::decode( $token, new Key( $this->secret_key, 'HS256' ) );

			// No Error ? Token not expired yet - return in 'Authorization' header
			$this->inject_token_in_header();

		}
		catch(\Exception $e) {
			$error_code = $e->getCode();
			$error_message = $e->getMessage();
			if ($error_message == 'Expired token') {
				$this->revoke_authorization();

				return false;
			}

		}

		return true;

	}
}