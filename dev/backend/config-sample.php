<?php

/**
 * Rename this file into config.php
 *
 * Go to https://eu.api.ovh.com/createToken/
 * Enter your OVHcloud credentials and create your API Keys
 * You will get:
 * - application key
 * - application secret
 * - consumer key
 *
 * Finally, complete the configuration below
 *
 * Get more detailed explanation here:
 * https://help.ovhcloud.com/csm/en-gb-api-getting-started-ovhcloud-api?id=kb_article_view&sysparm_article=KB0042784
 *
 */

/**
 * Put your OVH API Keys here
 */
define( 'OVH_APPLICATION_KEY', '' );
define( 'OVH_APPLICATION_SECRET', '' );
define( 'OVH_CONSUMER_KEY', '' );
define( 'OVH_API_ENDPOINT', 'ovh-eu' );

/**
 * URL to the backend
 * Do not change it if you use the installation from the downloaded release
 */

define( 'APP_API_ENDPOINT', '/api' );

/**
 * Just put what you want.
 * It is used to encrypt your authorization token when for frontend/backend communications
 */
define( 'AUTH_SECRET_KEY', '' );

/**
 * Used to authenticate you on login form
 */
define( 'LOGIN_USERNAME', '' );
define( 'LOGIN_PASSWORD', '' );

/**
 * The domain name associated to the MX Plan Hosting
 */
define( 'DOMAIN_NAME', '' );

/**
 * A list of email accounts you want to be excluded from listing
 */
define( 'EXCLUDE_ACCOUNTS', array() );