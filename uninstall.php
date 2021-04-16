<?php
// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}
 
// delete wafer audio data
 
delete_option('wafer_audio_free_obj');