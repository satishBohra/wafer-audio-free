<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
// admin page & register in admin menu

function wafer_audio_free_admin() {

    // html for admin page

    include( plugin_dir_path( __FILE__ ) . 'admin-body.php');

}



function wafer_audio_free_register_admin() {

    // enqueue codemirror

    if (!wp_script_is('wp-theme-plugin-editor', 'enqueued')) {

        add_action('admin_enqueue_scripts', 'codemirror_enqueue_scripts_waf');



        function codemirror_enqueue_scripts_waf($hook) {

            $cm_settings['codeEditor'] = wp_enqueue_code_editor(array('type' => 'text/css'));

            wp_localize_script('jquery', 'cm_settings', $cm_settings);

            wp_enqueue_script('wp-theme-plugin-editor');

            wp_enqueue_style('wp-codemirror');

        }

    }



    // enqueue WP MEDIA JavaScript

    if (!did_action('wp_enqueue_media')) {

        add_action('admin_enqueue_scripts', 'load_wp_media_code_waf');



        function load_wp_media_code_waf() {

            wp_enqueue_media();

        }

    }



    add_menu_page('Wafer Audio Free', 'Wafer Audio Free', 'manage_options', 'wafer-audio-free', 'wafer_audio_free_admin', 'dashicons-format-audio', null);

}



add_action('admin_menu', 'wafer_audio_free_register_admin');