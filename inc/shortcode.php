<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

    function wafer_audio_free_shortcode($atts) {

        $players = get_option('wafer_audio_free_obj');

        

        $a = shortcode_atts( array(

            'id' => '1',

            'theme' => '',

            'show_artist' => 'true',

            'show_title' => 'true',

            'show_tracks' => 'true',

            'loop' => 'false',

        ), $atts );

        $wafer_audio_free_obj = get_option('wafer_audio_free_obj');

        $player_title = 'Testing...';

        $tracksHTML = '';

        $audioElements = '';

        $iconThemes = [ 'free' => [
            plugins_url('img/icons/free/back.svg',__FILE__ ),
            plugins_url('img/icons/free/rewind.svg',__FILE__ ),
            plugins_url('img/icons/free/play.svg',__FILE__ ),
            plugins_url('img/icons/free/pause.svg',__FILE__ ),
            plugins_url('img/icons/free/stop.svg',__FILE__ ),
            plugins_url('img/icons/free/fast-forward.svg',__FILE__ ),
            plugins_url('img/icons/free/next.svg',__FILE__ ),
            plugins_url('img/icons/free/speaker-5.svg',__FILE__ ),
            plugins_url('img/icons/free/speaker-7.svg',__FILE__ ),
            plugins_url('img/icons/free/playlist-1.svg',__FILE__ ),
            plugins_url('img/icons/free/no-loop.svg',__FILE__ ),
            plugins_url('img/icons/free/loop.svg',__FILE__ ),
        ]];

        $buttonBar = '<div class="wafer-audio-free-button-bar">
            <img type="image/svg+xml" src="' . $iconThemes['free'][0] . '" class="wafer-audio-free-button back" draggable="false" />
            <img type="image/svg+xml" src="' . $iconThemes['free'][1] . '" class="wafer-audio-free-button rewind" draggable="false" />
            <img type="image/svg+xml" src="' . $iconThemes['free'][2] . '" class="wafer-audio-free-button play active" draggable="false" />
            <img type="image/svg+xml" src="' . $iconThemes['free'][3] . '" class="wafer-audio-free-button pause" draggable="false" />
            <img type="image/svg+xml" src="' . $iconThemes['free'][4] . '" class="wafer-audio-free-button stop" draggable="false" />
            <img type="image/svg+xml" src="' . $iconThemes['free'][5] . '" class="wafer-audio-free-button fast-forward" draggable="false" />
            <img type="image/svg+xml" src="' . $iconThemes['free'][6] . '" class="wafer-audio-free-button next" draggable="false" />
        </div>';

        $trackExpand = '';

        if ($a['show_tracks'] == 'true') {
            $trackExpand = 'expand';
        }

        foreach($wafer_audio_free_obj as $player => $playerData) {
            if ($player == 'player1') {
                $tracksHTML .= '<div class="wafer-tracks ' . $trackExpand . '">';
                $counter = 0;
                foreach($playerData as $key => $value) {
                    if ($key == 'playerTitle') {
                        $player_title = $value;
                    }
                    if (gettype($value) == 'object') {
                        $firstTrack = 'active';

                        foreach($value as $trackItem => $prop) {
                            if ($trackItem == 'title') {
                                if ($counter !== 0) {
                                    $firstTrack = '';
                                }
                                $tracksHTML .= '<p class="' . $firstTrack . '"><span class="progress-bar"></span><span class="title">' . $prop . '</span>';
                                $counter .= 1;
                            }
                            if ($trackItem == 'artist' && $a['show_artist'] !== 'false') {
                                if ($prop !== '') {
                                    $tracksHTML .= '<span class="artist">' . $prop . '</span><span class="indicator"></span><span class="time">0:00 / 0:00</span></p>';
                                } else {
                                    $tracksHTML .= '<span class="indicator"></span><span class="time">0:00 / 0:00</span></p>';
                                }
                            } elseif ($trackItem == 'artist' && $a['show_artist'] == 'false') {
                                $tracksHTML .= '<span class="indicator"></span><span class="time">0:00 / 0:00</span></p>';
                            }
                            if ($trackItem == 'url') {
                                $audioElements .= '<audio src=' . esc_url($prop) . '></audio>';
                            }
                        }
                    }
                }
                $tracksHTML .= '</div>';
            }
        }

        $volumeButtons = '<div class="wafer-audio-free-volume-slider"><div class="wafer-audio-free-volume-indicator"></div></div>';

        $playlistButton = '<img src="' . $iconThemes['free'][9] . '" class="playlist-button" />';

        $titleHTML = '<h3>' . $player_title . '</h3>';
        $noTitleClass = '';

        if ($a['show_title'] == 'false') {
            $titleHTML = '';
            $noTitleClass = ' no-title';
        }

        $theme = '';

        if ($a['theme'] !== '') {
            $theme = ' ' . $a['theme'];
        }

        $loop = ' no-loop';

        $loopIconSrc = $iconThemes['free'][10];

        if ($a['loop'] == 'true') {
            $loop = ' loop';
            $loopIconSrc = $iconThemes['free'][11];
        }

        $multiButton = '<img class="multi-button' . $loop . '" src="' . $loopIconSrc . '" />';

        $outputHTML = '<div class="wafer-player' . $noTitleClass . $theme . $loop . '" data-index="' . $a["id"] . '">' . $volumeButtons . $multiButton . $playlistButton . $titleHTML . $buttonBar . $tracksHTML . $audioElements . '</div>';

        return $outputHTML;

    }

    add_shortcode('wafer_audio_free_player', 'wafer_audio_free_shortcode');

?>