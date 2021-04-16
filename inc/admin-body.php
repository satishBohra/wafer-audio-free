<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly ?>
<div class='wafer-audio-free-admin-page'>

    <div class='save'>Saved</div>

    <h2>Wafer Audio Free</h2>

    <div>

        <p>Click the button below to create a new player. Insert a player on a page or post by using the shortcode: <code>[wafer_audio_free_player]</code></p>

        <p>Include the theme attribute to enable dark mode: <code>[wafer_audio_free_player theme="dark"]</code></p>

        <p>Try out some of these attributes, too:</p>

        <p><code>[wafer_audio_free_player show_title="false" show_artist="false" show_tracks="false"]</code></p>

        <p><small>(these are set to "true" by default)</small></p>

        <div class='wafer-audio-free-toolbar'>
            <button class='wafer-audio-free-new-player wafer-audio-free-btn' title='Create Player'><span class="dashicons dashicons-plus"></span></button>
            <button class='wafer-audio-free-btn' onclick='wafDeletePlayers();' title='Delete Player(s)'><span class="dashicons dashicons-trash"></span></button>
        </div>
        <div class='wafer-audio-free-players'>
        <?php
            $wafer_audio_free_obj = get_option('wafer_audio_free_obj');
            $counter = 1;
            foreach($wafer_audio_free_obj as $player => $playerData) {
                ?>
                <div id='wafPlayer<?php echo $counter; ?>' class='wafer-audio-free-player'>
                    <div class='wafer-audio-free-player-toolbar'>
                <?php
                    foreach($playerData as $toolbarItem => $value) {
                        if ($toolbarItem == 'playerTitle') {
                            echo '<input type="text" class="wafer-audio-free-player-title" placeholder="player title" value="' . $value . '" />';
                        }
                        if ($toolbarItem == 'selected') {
                            $checked = '';
                            if ($value == true) {
                                $checked = 'checked';
                            }
                            echo '<input title="Select Player" type="checkbox" class="wafer-audio-free-select-player" ' . $checked . '/>';
                        }
                    }
                ?>
                        <button onclick="wafAddTrack(this)" class="wafer-audio-free-btn" title="Add Track">
                            <span class="dashicons dashicons-plus"></span>
                        </button>
                        <span class="wafer-audio-free-shortcode"></span>
                    </div>
                <?php
                $track_counter = 1;
                foreach($playerData as $key => $value) {
                    if (gettype($value) == 'object') {
                        ?>
                        <div class="wafer-track">
                        <?php
                        echo '<span class="dashicons dashicons-move"></span>';
                        foreach($value as $trackItem => $prop) {
                            if ($trackItem == 'title') {
                                echo '<input type="text" class="wafer-audio-free-track-title" placeholder="track title" value="' . $prop . '" />';
                            } elseif ($trackItem == 'artist') {
                                echo '<input type="text" class="wafer-audio-free-track-artist" placeholder="artist" value="' . $prop . '" />';
                            } elseif ($trackItem == 'url') {
                                echo '<input type="text" class="wafer-audio-free-track-source" placeholder="url" value="' . $prop . '" />';
                            }
                        }
                        echo '<button title="Choose Audio Source" class="open-select-frame" onclick="wafMediaButton(this)"><span class="dashicons dashicons-media-audio"></span></button>';
                        echo '<button title="Delete Track" class="wafer-audio-free-btn" onclick="wafDeleteTrack(this);"><span class="dashicons dashicons-trash"></span></button>';
                        $track_counter++;
                        ?>
                        </div>
                        <?php
                    }
                }
                ?>
                </div>
                <?php
                $counter++;
            }
            // print_r($wafer_audio_free_obj);
        ?>
        </div>

    </div>

    <?php wp_nonce_field( 'wafer_audio_free_ajax' ); ?>

    <button class='wafer-audio-free-btn saving'>Save</button>

    <div class='wafer-audio-free-signature'>

        <a href='https://wafer-audio.com' target='_blank'>wafer-audio.com</a>
        
    </div>

</div>