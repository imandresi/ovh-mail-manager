<?php

namespace App\Core;

use GuzzleHttp\Exception\ClientException;
use \Ovh\Api;

class MailManager {

	public Api $ovh;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->ovh = new Api(
			APPLICATION_KEY,
			APPLICATION_SECRET,
			API_ENDPOINT,
			CONSUMER_KEY
		);
	}

	/**
	 * Change the mail password
	 *
	 * On Success:
	 * {
	 *     date:   "2024-05-06T17:20:57+02:00"
	 *     id:     123456789
	 *     domain: "example.com"
	 *     action: "changePassword"
	 *     name:   "my.mailbox"
	 * }
	 *
	 * On Error:
	 * Bad Request (400)
	 * { "message": "Password too short (needs to be at least 8 characters)" }
	 *
	 * @param $domain
	 * @param $account
	 * @param $password
	 *
	 * @return array
	 * @throws ClientException if http request is an error
	 *
	 */
	public function change_password( $domain, $account, $password ): array {
		$result = $this->ovh->post( "/email/domain/{$domain}/account/{$account}/changePassword", array(
			'password' => $password,
		) );

		return $result;
	}

	/**
	 * Returns a list of all accounts
	 *
	 * On Success:
	 * [
	 *     "john.doe"
	 *     "emily.smith"
	 *     "alexander.johnson"
	 * ]
	 *
	 * On Error:
	 * Not Found (404)
	 * { "message": "This service does not exist" }
	 *
	 * @param $domain
	 * @param $exclude
	 *
	 * @return array
	 *
	 * @throws ClientException if http request is an error
	 * @throws JsonException
	 *
	 */
	public function get_accounts( $domain, $exclude = [] ): array {
		$accounts = $this->ovh->get( "/email/domain/{$domain}/account" );
		$accounts = array_filter( $accounts, function ( $value ) use ( $exclude ) {
			return ! in_array( $value, $exclude );
		} );

		$result = [];

		foreach ($accounts as $account) {
			$account_details = $this->get_account_details($domain, $account);
			$result[] = $account_details;
		}

		return $result;
	}

	/**
	 * Gets details about an account
	 *
	 * On Success:
	 * {
	 *     email: "john.doe@example.com"
	 *     description: "mi12345-ovh"
	 *     accountName: "john.doe"
	 *     domain: "example.com"
	 *     size: 5000000000
	 *     isBlocked: false
	 *     usage: {
	 *          date: "2023-07-03T12:11:23+02:00"
	 *          quota: 8968770
	 *          emailCount: 34
	 *     }
	 * }
	 *
	 * On Error:
	 * Not Found (404)
	 * { "message": "The requested object (accountName = unknown) does not exist" }
	 *
	 * @param $domain
	 * @param $account_name
	 *
	 * @return array
	 *
	 * @throws ClientException if http request is an error
	 * @throws JsonException
	 *
	 */
	public function get_account_details( $domain, $account_name ): array {
		$result = $this->ovh->get( "/email/domain/{$domain}/account/{$account_name}" );
		$usage = $this->get_account_usage($domain, $account_name);
		$result['usage'] = $usage;

		return $result;
	}


	/**
	 * Returns a stats of the mailbox usage
	 *
	 * On success:
	 * {
	 *     date: "2023-07-03T12:11:23+02:00"
	 *     quota: 8968770
	 *     emailCount: 34
	 * }
	 *
	 * On error:
	 * Not Found (404)
	 * { "message": "This service does not exist" }
	 *
	 * @param $domain
	 * @param $account_name
	 *
	 * @return mixed|null
	 * @throws JsonException
	 */
	public function get_account_usage( $domain, $account_name ) {
		$result = $this->ovh->get( "/email/domain/{$domain}/account/{$account_name}/usage" );

		return $result;
	}

}