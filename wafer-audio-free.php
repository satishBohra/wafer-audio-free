<?php 

/**

 * Plugin Name:       Wafer Audio Free

 * Plugin URI:        https://wafer-audio.com

 * Description:       Play music on your site with a simple shortcode!

 * Version:           3.0.0

 * Requires at least: 5.2

 * Requires PHP:      7.2

 * Author:            Allen Sulzen

 * Author URI:        https://wafer-audio.com

 * License:           GPL v2 or later

 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html

 */



// prevent unauthorized use
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



include( plugin_dir_path( __FILE__ ) . 'inc/admin-options.php' );



include( plugin_dir_path( __FILE__ ) . 'inc/admin-page.php' );



include( plugin_dir_path( __FILE__ ) . 'inc/shortcode.php' );



function load_wafer_audio_free_scripts() {
    wp_enqueue_style('wafer-audio-free-style', plugins_url('inc/wafer-audio-free-styles.css',__FILE__ ));
    wp_enqueue_script('wafer-audio-free-script', plugins_url('inc/wafer-audio-free-scripts.js',__FILE__ ), '', false, true);
}

add_action('wp_enqueue_scripts', 'load_wafer_audio_free_scripts');

function load_wafer_audio_free_admin_scripts() {
    wp_enqueue_script('wafer_audio_free_admin_scripts', plugins_url('inc/admin-scripts.js',__FILE__ ), [], false, true);
    wp_enqueue_style('wafer_audio_free_admin_styles', plugins_url('inc/admin-styles.css',__FILE__ ));
}

add_action('admin_enqueue_scripts', 'load_wafer_audio_free_admin_scripts');

function wafer_audio_free_sanitizer($post_data) {
    foreach($post_data as $player) {
        $player->playerTitle = sanitize_text_field($player->playerTitle);
        $player->selected = wp_validate_boolean($player->selected) ? $player->selected : false;
        foreach($player as $track) {
            $track->title = sanitize_text_field($track->title);
            $track->artist = sanitize_text_field($track->artist);
            $track->url = esc_url_raw($track->url);
        }
    }
    return $post_data;
}

function wafer_audio_free_save() {
    $nonce_check = wp_verify_nonce($_POST['nonce'], 'wafer_audio_free_ajax');
    if (isset($_POST) && isset($_POST['wafer_audio_free_obj']) && current_user_can( 'manage_options' ) && $nonce_check && is_string($_POST['wafer_audio_free_obj'])) {
        $post_data = json_decode(wp_unslash($_POST['wafer_audio_free_obj']));
        $sanitized_array = wafer_audio_free_sanitizer($post_data);
        update_option('wafer_audio_free_obj', $sanitized_array);
        echo 'wafer free object saved!';
        wp_die();
    }
}

add_action('wp_ajax_wafer_audio_free_save', 'wafer_audio_free_save');

function wafer_audio_free_fetch() {
    $nonce_check = wp_verify_nonce($_POST['nonce'], 'wafer_audio_free_ajax');
    if (isset($_POST) && isset($_POST['action']) && $_POST['action'] == 'wafer_audio_free_fetch' && current_user_can( 'manage_options' ) && $nonce_check) {
        echo json_encode(get_option('wafer_audio_free_obj'));
        wp_die();
    }
}

add_action('wp_ajax_wafer_audio_free_fetch', 'wafer_audio_free_fetch');
?>