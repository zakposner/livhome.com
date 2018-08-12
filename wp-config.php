<?php
# Database Configuration
define( 'DB_NAME', 'wp_livhome' );
define( 'DB_USER', 'livhome' );
define( 'DB_PASSWORD', 'jeYxC7dlk60aOHvZ7jLq' );
define( 'DB_HOST', '127.0.0.1' );
define( 'DB_HOST_SLAVE', '127.0.0.1' );
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');
$table_prefix = 'wp_';

# Security Salts, Keys, Etc
define('AUTH_KEY',         'Oc3>mO_SW(Ebtk%+dgr)r{YkroD+vzxq}YeyL8)+=).,d(4np<>?N.XwbBPM|n%E');
define('SECURE_AUTH_KEY',  'Ii`9L5|.@epNwHSU2u-[RCL#yz(oG6qS{*gN+pbST)I<0bkCA:um7v<r8DIo0f!L');
define('LOGGED_IN_KEY',    '6)Z@f&=@*N^}OSsURLErN5DRzjmj/R)cTcnlhI8==)8z*g9vT+N0sZB$AgMpBa.e');
define('NONCE_KEY',        '62%mrZQ-#-eubYlkQ4ZS{?86Cc$K^<oC+e{a-5Nq9nJo47^Kt|/!_2qA_`^06Aqv');
define('AUTH_SALT',        'S>V8giTe;dZ{I^RyurTGj&Zb1Y9+-j/)29-a5!Kd:Q|)_!FmaV/p-X>4bE6,Xl{Q');
define('SECURE_AUTH_SALT', 'M1LWt,GTN7`0$HI9MS)C7r5/M6--J}<j^IB.YM9a*)5wEmC{mBH|Y?c:O.%[({>s');
define('LOGGED_IN_SALT',   ']fA=OcD,r30 &mDxuE?d`%s~r(ddfBv|Tayx+e7|E>/!EBr}cuz)pYtpZs,;w;OU');
define('NONCE_SALT',       '@+|IF?f;1hV=3<}ifRtK!r=d1y,a=h]1HE`*iJ;d`RqL;ypF60+L9iXc+OB82KhE');


# Localized Language Stuff

define( 'WP_CACHE', TRUE );

define( 'WP_AUTO_UPDATE_CORE', false );

define( 'PWP_NAME', 'livhome' );

define( 'FS_METHOD', 'direct' );

define( 'FS_CHMOD_DIR', 0775 );

define( 'FS_CHMOD_FILE', 0664 );

define( 'PWP_ROOT_DIR', '/nas/wp' );

define( 'WPE_APIKEY', '6b842b019436172802a3f3acbc3052db9ab134e6' );

define( 'WPE_CLUSTER_ID', '120253' );

define( 'WPE_CLUSTER_TYPE', 'pod' );

define( 'WPE_ISP', true );

define( 'WPE_BPOD', false );

define( 'WPE_RO_FILESYSTEM', false );

define( 'WPE_LARGEFS_BUCKET', 'largefs.wpengine' );

define( 'WPE_SFTP_PORT', 2222 );

define( 'WPE_LBMASTER_IP', '' );

define( 'WPE_CDN_DISABLE_ALLOWED', true );

define( 'DISALLOW_FILE_MODS', FALSE );

define( 'DISALLOW_FILE_EDIT', FALSE );

define( 'DISABLE_WP_CRON', false );

define( 'WPE_FORCE_SSL_LOGIN', true );

define( 'FORCE_SSL_LOGIN', true );

/*SSLSTART*/ if ( isset($_SERVER['HTTP_X_WPE_SSL']) && $_SERVER['HTTP_X_WPE_SSL'] ) $_SERVER['HTTPS'] = 'on'; /*SSLEND*/

define( 'WPE_EXTERNAL_URL', false );

define( 'WP_POST_REVISIONS', FALSE );

define( 'WPE_WHITELABEL', 'wpengine' );

define( 'WP_TURN_OFF_ADMIN_BAR', false );

define( 'WPE_BETA_TESTER', false );

umask(0002);

$wpe_cdn_uris=array ( );

$wpe_no_cdn_uris=array ( );

$wpe_content_regexs=array ( );

$wpe_all_domains=array ( 0 => 'www.livhome.com', 1 => 'livhome.com', 2 => 'livhome.wpengine.com', );

$wpe_varnish_servers=array ( 0 => 'pod-120253', );

$wpe_special_ips=array ( 0 => '35.196.104.31', );

$wpe_ec_servers=array ( );

$wpe_largefs=array ( );

$wpe_netdna_domains=array ( );

$wpe_netdna_domains_secure=array ( );

$wpe_netdna_push_domains=array ( );

$wpe_domain_mappings=array ( );

$memcached_servers=array ( );


# WP Engine ID


# WP Engine Settings (by Zak)
define( 'WP_MEMORY_LIMIT', '512M' );





define('WPCACHEHOME', '/nas/content/live/livhome/wp-content/plugins/wp-super-cache/');

# That's It. Pencils down
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'wp-settings.php');

$_wpe_preamble_path = null; if(false){}
