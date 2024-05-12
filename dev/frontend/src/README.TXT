
   ____   __      __  _    _
  / __ \  \ \    / / | |  | |
 | |  | |  \ \  / /  | |__| |
 | |  | |   \ \/ /   |  __  |
 | |__| |    \  /    | |  | |
  \____/      \/     |_|  |_|


  __  __           _   _     __  __
 |  \/  |         (_) | |   |  \/  |
 | \  / |   __ _   _  | |   | \  / |   __ _   _ __     __ _    __ _    ___   _ __
 | |\/| |  / _` | | | | |   | |\/| |  / _` | | '_ \   / _` |  / _` |  / _ \ | '__|
 | |  | | | (_| | | | | |   | |  | | | (_| | | | | | | (_| | | (_| | |  __/ | |
 |_|  |_|  \__,_| |_| |_|   |_|  |_|  \__,_| |_| |_|  \__,_|  \__, |  \___| |_|
                                                               __/ |
                                                              |___/


====================
  OVH Mail Manager
====================

https://github.com/imandresi/ovh-mail-manager

OVH Mail Manager is an application designed to simplify the process of changing RoundCube
email passwords for users with old MX Plan hosting on OVH. This application provides a user-friendly
interface for updating email passwords directly without the need to access the main OVH account.


## User Installation Guide

Before using the application, it's essential to have an account with OVHcloud and a legacy infrastructure
hosting MX Plan. Users with new OVH hosting plans can directly modify their email passwords via RoundCube
and therefore do not require this application.

This application can manage the emails through OVH Email REST APIs. To access these APIs, the application
requires specific OVHcloud API Keys, which can be generated using the following link:
https://eu.api.ovh.com/createToken/

1. Then, proceed to create a subdomain within your hosting plan where you can host the application
   (e.g., mail-manager.example.com).

2. Download the latest release of the application from the following link:
   https://github.com/imandresi/ovh-mail-manager/releases

3. Unzip the downloaded file on your local computer and proceed to configure the application.

4. Open the `./api/config.php` file and populate the PHP constants with their respective values.

5. Finally, upload the files to the root directory associated with the created subdomain by using FTP.

HAVE FUN !!!


## LICENSING

This software is licensed under the MIT License - Copyright (c)2024 - Tanjaka Mandresi
Please see the License file for more details.
