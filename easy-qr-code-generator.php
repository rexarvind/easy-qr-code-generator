<?php
/**
 * Plugin Name: Easy QR Code Generator
 * Description: The Easy QR Code Generator is a WordPress plugin you can generate wide custom and automatic site page URL QR code generator and use them for Elementor, widgets, and Shortcodes.
 * Author:      Byvex Team
 * Author URI:  https://www.byvex.com/
 * Version:     0.0.1
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: easy-qrcode
*/

if( ! defined( 'ABSPATH' ) ) exit(); // Exit if accessed directly

define( 'HTQRCODE_VERSION', '0.0.1' );
define( 'EASYQRCODE_VERSION', '0.0.1' );

define( 'HTQRCODE_PL_ROOT', __FILE__ );
define( 'EASYQRCODE_PL_ROOT', __FILE__ );

define( 'HTQRCODE_PL_URL', plugins_url( '/', HTQRCODE_PL_ROOT ) );
define( 'EASYQRCODE_PL_URL', plugins_url( '/', EASYQRCODE_PL_ROOT ) );

define( 'HTQRCODE_PL_PATH', plugin_dir_path( HTQRCODE_PL_ROOT ) );
define( 'EASYQRCODE_PL_PATH', plugin_dir_path( EASYQRCODE_PL_ROOT ) );

define( 'HTQRCODE_PL_INCLUDE', HTQRCODE_PL_PATH .'include/' );
define( 'EASYQRCODE_PL_INCLUDE', EASYQRCODE_PL_PATH .'include/' );

// Required File
include( EASYQRCODE_PL_INCLUDE.'/class.htqrcode.php' );
HTQRcode_Addons_Elementor::instance();
