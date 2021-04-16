"use strict";

(function () {
  document.waferPlayers = document.querySelectorAll('.wafer-player');
  document.waferPlayerObj = {};
  document.waferPlayerInts = [];

  document.waferListener = function (player) {
    // runs every 100ms, sets active progress bar width to duration %
    var activeTrackIndex = 0;
    var currentTrackDuration = player.querySelectorAll('audio')[activeTrackIndex].duration;
    var currentTrackTime = player.querySelectorAll('audio')[activeTrackIndex].currentTime;
    player.querySelectorAll('.wafer-tracks p').forEach(function (track, index) {
      if (track.classList.contains('active')) {
        activeTrackIndex = index;
      }

      currentTrackDuration = player.querySelectorAll('audio')[activeTrackIndex].duration;
      currentTrackTime = player.querySelectorAll('audio')[activeTrackIndex].currentTime; // set all widths to zero

      track.querySelector('span.progress-bar').style.width = 0; // update time for active track

      var currentTimeMinutes = Math.floor(currentTrackTime / 60);
      var currentTimeSeconds = Math.floor(currentTrackTime % 60);

      if (currentTimeSeconds < 10) {
        currentTimeSeconds = '0' + currentTimeSeconds;
      }

      var currentDurationMinutes = Math.floor(currentTrackDuration / 60);
      var currentDurationSeconds = Math.floor(currentTrackDuration % 60);

      if (currentDurationSeconds < 10) {
        currentDurationSeconds = '0' + currentDurationSeconds;
      }

      var currentTimeMinSec = currentTimeMinutes + ':' + currentTimeSeconds;
      var currentDurationMinSec = currentDurationMinutes + ':' + currentDurationSeconds;

      if (track.classList.contains('active') && currentDurationMinSec !== 'NaN:NaN') {
        track.querySelector('p.active span.time').textContent = currentTimeMinSec + ' / ' + currentDurationMinSec;
      } else if (track.classList.contains('active')) {
        track.querySelector('p.active span.time').textContent = '0:00 / 0:00';
      }
    });
    player.querySelectorAll('.wafer-tracks span.progress-bar')[activeTrackIndex].style.width = currentTrackTime / currentTrackDuration * 100 + '%'; // when reaching end of track skip to next

    if (currentTrackDuration == currentTrackTime) {
      // condition for if this is the last track and loop is present / not
      if (player.classList.contains('loop')) {
        document.waferPlayerObj['player' + player.dataset.index].waferSkip();
      } else if (!player.classList.contains('loop') && document.waferPlayerObj['player' + player.dataset.index].totalTracks !== activeTrackIndex + 1) {
        document.waferPlayerObj['player' + player.dataset.index].waferSkip();
      }
    } 

    // set volume for all html5 audio elements whenever changed
    player.querySelectorAll('audio').forEach(function (audio) {
      audio.volume = document.waferPlayerObj['player' + player.dataset.index].volume;
    });
  };

  document.waferPlayers.forEach(function (player, index) {
    var playerIndex = index;
    var title = '';

    if (player.querySelector('h3')) {
      title = player.querySelector('h3').textContent;
    }

    document.waferPlayerObj['player' + (index + 1)] = {
      audioElements: player.querySelectorAll('audio'),
      currentTrack: player.querySelectorAll('audio')[0],
      totalTracks: player.querySelectorAll('audio').length,
      volume: 1,
      playButtonToggle: 'play',
      currentTrackIndex: 0,
      title: title,
      waferPlay: function waferPlay() {
        document.waferPlayerObj['player' + (playerIndex + 1)].currentTrack.play();
      },
      waferStop: function waferStop() {
        document.waferPlayerObj['player' + (playerIndex + 1)].audioElements.forEach(function (audio, index) {
          if (index == document.waferPlayerObj['player' + (playerIndex + 1)].currentTrackIndex) {
            audio.pause();
            audio.currentTime = 0;

            if (document.waferPlayerObj['player' + (playerIndex + 1)].playButtonToggle == 'pause') {
              document.waferPlayerObj['player' + (playerIndex + 1)].togglePlayButton();
            }
          }
        });
      },
      waferPause: function waferPause() {
        document.waferPlayerObj['player' + (playerIndex + 1)].audioElements.forEach(function (audio, index) {
          if (index == document.waferPlayerObj['player' + (playerIndex + 1)].currentTrackIndex) {
            audio.pause();
          }
        });
      },
      waferSkip: function waferSkip() {
        var playerNum = 'player' + (playerIndex + 1);

        if (document.waferPlayerObj[playerNum].currentTrackIndex < document.waferPlayerObj[playerNum].totalTracks - 1) {
          // stop player
          document.waferPlayerObj[playerNum].waferStop(); // increment current track by one

          document.waferPlayerObj[playerNum].currentTrackIndex++; // set new track audio

          document.waferPlayerObj[playerNum].currentTrack = document.waferPlayerObj[playerNum].audioElements[document.waferPlayerObj[playerNum].currentTrackIndex]; // set next track paragraph as active

          var _player = document.querySelectorAll('.wafer-player')[playerIndex];

          _player.querySelectorAll('.wafer-tracks p').forEach(function (track, index) {
            track.classList.remove('active');

            if (index == document.waferPlayerObj[playerNum].currentTrackIndex) {
              track.classList.add('active');
            }
          }); 

          // play again
          document.waferPlayerObj[playerNum].togglePlayButton();
        } else {
          // stop player
          document.waferPlayerObj[playerNum].waferStop(); // increment current track by one

          document.waferPlayerObj[playerNum].currentTrackIndex = 0; // set new track audio

          document.waferPlayerObj[playerNum].currentTrack = document.waferPlayerObj[playerNum].audioElements[0]; // set next track paragraph as active

          var _player2 = document.querySelectorAll('.wafer-player')[playerIndex];

          _player2.querySelectorAll('.wafer-tracks p').forEach(function (track, index) {
            track.classList.remove('active');

            if (index == document.waferPlayerObj[playerNum].currentTrackIndex) {
              track.classList.add('active');
            }
          }); 

          // play again
          document.waferPlayerObj[playerNum].togglePlayButton();
        }
      },
      waferSkipBack: function waferSkipBack() {
        var playerNum = 'player' + (playerIndex + 1);

        if (document.waferPlayerObj[playerNum].audioElements[document.waferPlayerObj[playerNum].currentTrackIndex].currentTime > 10) {
          // over ten seconds, bring song back to the beginning
          document.waferPlayerObj[playerNum].currentTrack.currentTime = 0;
        } else {
          if (document.waferPlayerObj[playerNum].currentTrackIndex > 0) {
            // stop player
            document.waferPlayerObj[playerNum].waferStop(); // decrement current track by one

            document.waferPlayerObj[playerNum].currentTrackIndex--; // set new track audio

            document.waferPlayerObj[playerNum].currentTrack = document.waferPlayerObj[playerNum].audioElements[document.waferPlayerObj[playerNum].currentTrackIndex]; // set previous track paragraph as active

            var _player3 = document.querySelectorAll('.wafer-player')[playerIndex];

            _player3.querySelectorAll('.wafer-tracks p').forEach(function (track, index) {
              track.classList.remove('active');

              if (index == document.waferPlayerObj[playerNum].currentTrackIndex) {
                track.classList.add('active');
              }
            }); 

            // play again
            document.waferPlayerObj[playerNum].togglePlayButton();
          } else {
            // stop player
            document.waferPlayerObj[playerNum].waferStop(); // set current track index to last track

            document.waferPlayerObj[playerNum].currentTrackIndex = document.waferPlayerObj[playerNum].totalTracks - 1; // set new track audio

            document.waferPlayerObj[playerNum].currentTrack = document.waferPlayerObj[playerNum].audioElements[document.waferPlayerObj[playerNum].totalTracks - 1]; // set previous track paragraph as active

            var _player4 = document.querySelectorAll('.wafer-player')[playerIndex];

            _player4.querySelectorAll('.wafer-tracks p').forEach(function (track, index) {
              track.classList.remove('active');

              if (index == document.waferPlayerObj[playerNum].currentTrackIndex) {
                track.classList.add('active');
              }
            }); 

            // play again
            document.waferPlayerObj[playerNum].togglePlayButton();
          }
        }
      },
      waferRewind: function waferRewind() {
        var playerNum = 'player' + (playerIndex + 1);

        if (document.waferPlayerObj[playerNum].currentTrack.currentTime / document.waferPlayerObj[playerNum].currentTrack.duration > .1) {
          // reduce time by ten percent of track duration
          document.waferPlayerObj[playerNum].currentTrack.currentTime -= document.waferPlayerObj[playerNum].currentTrack.duration * .1;
        }
      },
      waferFastForward: function waferFastForward() {
        var playerNum = 'player' + (playerIndex + 1);

        if (document.waferPlayerObj[playerNum].currentTrack.currentTime / document.waferPlayerObj[playerNum].currentTrack.duration < .9) {
          // increase time by ten percent of track duration
          document.waferPlayerObj[playerNum].currentTrack.currentTime += document.waferPlayerObj[playerNum].currentTrack.duration * .1;
        }
      },
      togglePlayButton: function togglePlayButton() {
        var wafPlayButton = player.querySelector('.wafer-audio-free-button.play');
        var wafPauseButton = player.querySelector('.wafer-audio-free-button.pause');

        if (wafPlayButton.classList.contains('active')) {
          wafPlayButton.classList.remove('active');
          wafPauseButton.classList.add('active');
          document.waferPlayerObj['player' + (playerIndex + 1)].playButtonToggle = 'pause';
          document.waferPlayerObj['player' + (playerIndex + 1)].waferPlay();
        } else {
          wafPlayButton.classList.add('active');
          wafPauseButton.classList.remove('active');
          document.waferPlayerObj['player' + (playerIndex + 1)].playButtonToggle = 'play';
          document.waferPlayerObj['player' + (playerIndex + 1)].waferPause();
        }
      }
    }; 

    // add event listeners to buttons
    var playerButtons = player.querySelectorAll('.wafer-audio-free-button');
    playerButtons.forEach(function (button, index) {
      if (button.classList.contains('play') || button.classList.contains('pause')) {
        button.addEventListener('click', document.waferPlayerObj['player' + (playerIndex + 1)].togglePlayButton);
      }

      if (button.classList.contains('stop')) {
        button.addEventListener('click', document.waferPlayerObj['player' + (playerIndex + 1)].waferStop);
      }

      if (button.classList.contains('next')) {
        button.addEventListener('click', document.waferPlayerObj['player' + (playerIndex + 1)].waferSkip);
      }

      if (button.classList.contains('back')) {
        button.addEventListener('click', document.waferPlayerObj['player' + (playerIndex + 1)].waferSkipBack);
      }

      if (button.classList.contains('rewind')) {
        button.addEventListener('click', document.waferPlayerObj['player' + (playerIndex + 1)].waferRewind);
      }

      if (button.classList.contains('fast-forward')) {
        button.addEventListener('click', document.waferPlayerObj['player' + (playerIndex + 1)].waferFastForward);
      }
    }); 

    // add event listeners to tracks when clicked
    var playerTracks = player.querySelectorAll('.wafer-tracks p');
    playerTracks.forEach(function (track, index) {
      track.addEventListener('click', function (event) {
        var width = this.getBoundingClientRect().width;
        var leftPosition = this.getBoundingClientRect().x;
        var clickX = event.clientX;
        var pixelsFromLeft = clickX - leftPosition;
        var widthRatio = pixelsFromLeft / width;
        var widthPercentage = pixelsFromLeft / width * 100 + '%';

        if (index == document.waferPlayerObj['player' + (playerIndex + 1)].currentTrackIndex) {
          document.waferPlayerObj['player' + (playerIndex + 1)].waferStop();
          document.waferPlayerObj['player' + (playerIndex + 1)].currentTrackIndex = index;
          document.waferPlayerObj['player' + (playerIndex + 1)].currentTrack = document.waferPlayerObj['player' + (playerIndex + 1)].audioElements[index];
          document.waferPlayerObj['player' + (playerIndex + 1)].togglePlayButton();
          document.waferPlayerObj['player' + (playerIndex + 1)].currentTrack.currentTime = document.waferPlayerObj['player' + (playerIndex + 1)].currentTrack.duration * widthRatio;
          this.querySelector('span.progress-bar').style.width = widthPercentage;
        } else {
          document.waferPlayerObj['player' + (playerIndex + 1)].waferStop();
          document.waferPlayerObj['player' + (playerIndex + 1)].currentTrackIndex = index;
          document.waferPlayerObj['player' + (playerIndex + 1)].currentTrack = document.waferPlayerObj['player' + (playerIndex + 1)].audioElements[index];
          document.waferPlayerObj['player' + (playerIndex + 1)].togglePlayButton();
        }

        playerTracks.forEach(function (track) {
          track.classList.remove('active');
          track.querySelector('span.progress-bar').style.width = 0;
        });
        this.classList.add('active');
      });
      track.addEventListener('mousemove', function (event) {
        var pWidth = track.getBoundingClientRect().width;
        var mousePos = event.clientX;
        var leftPos = track.getBoundingClientRect().x;
        var diff = mousePos - leftPos;
        var percentage = diff / pWidth * 100;
        if (percentage < 99.5 && percentage > -1) {
          track.querySelector('span.indicator').style.left = percentage + '%';
        }
      });
    }); 
    // volume slider click action
    player.querySelector(".wafer-audio-free-volume-slider").addEventListener("click", function (e) {
      if (e.target.classList.contains('wafer-audio-free-volume-slider')) {
          var sliderLeft = e.target.getBoundingClientRect().left;
          var clickPosX = e.clientX;
          var sliderDiff = clickPosX - sliderLeft;
          e.target.querySelector('.wafer-audio-free-volume-indicator').style.left = sliderDiff + 'px';
          var volumePercentage = Number((sliderDiff / e.target.getBoundingClientRect().width).toFixed(2));
          document.waferPlayerObj["player" + (playerIndex + 1)].volume = volumePercentage;
      }
    });
    // slider event listeners for desktop
    player.querySelector(".wafer-audio-free-volume-indicator").addEventListener("mousedown", function (e) {
        document.waferPlayerObj["player" + (playerIndex + 1)].draggingSlider = true;
    });
    document.body.addEventListener("mouseup", function (e) {
        document.waferPlayerObj["player" + (playerIndex + 1)].draggingSlider = false;
    });
    player.addEventListener("mousemove", function (e) {
        var sliderLeft = document.querySelectorAll('.wafer-player .wafer-audio-free-volume-slider')[playerIndex].getBoundingClientRect().left;
        var sliderRight = document.querySelectorAll('.wafer-player .wafer-audio-free-volume-slider')[playerIndex].getBoundingClientRect().right;
        var clickPosX = e.clientX;
        var sliderDiff = clickPosX - sliderLeft;
        if (document.waferPlayerObj["player" + (playerIndex + 1)].draggingSlider == true && clickPosX > sliderLeft - 1 && clickPosX < sliderRight -1) {
            document.querySelectorAll('.wafer-player .wafer-audio-free-volume-indicator')[playerIndex].style.left = (sliderDiff - 0) + 'px';
            var volumePercentage = Number((sliderDiff / 55).toFixed(2));
            if (volumePercentage >= 0 && volumePercentage <= 1)
            document.waferPlayerObj["player" + (playerIndex + 1)].volume = volumePercentage;
        }
    });
    // mobile touch support
    player.querySelector(".wafer-audio-free-volume-indicator").addEventListener("touchstart", function (e) {
        document.waferPlayerObj["player" + (playerIndex + 1)].draggingSlider = true;
    });
    document.body.addEventListener("touchend", function (e) {
        document.waferPlayerObj["player" + (playerIndex + 1)].draggingSlider = false;
    });
    player.addEventListener("touchmove", function (e) {
        var sliderLeft = document.querySelectorAll('.wafer-player .wafer-audio-free-volume-slider')[playerIndex].getBoundingClientRect().left;
        var sliderRight = document.querySelectorAll('.wafer-player .wafer-audio-free-volume-slider')[playerIndex].getBoundingClientRect().right;
        var clickPosX = e.touches[0].clientX;
        var sliderDiff = clickPosX - sliderLeft;
        if (document.waferPlayerObj["player" + (playerIndex + 1)].draggingSlider == true && clickPosX > sliderLeft - 1 && clickPosX < sliderRight -1) {
            document.querySelectorAll('.wafer-player .wafer-audio-free-volume-indicator')[playerIndex].style.left = (sliderDiff - 0) + 'px';
            var volumePercentage = Number((sliderDiff / 55).toFixed(2));
            if (volumePercentage >= 0 && volumePercentage <= 1)
            document.waferPlayerObj["player" + (playerIndex + 1)].volume = volumePercentage;
        }
    });
    
    // add event listener to playlist toggle button
    player.querySelector('.playlist-button').addEventListener('click', function () {
      if (player.querySelector('.wafer-tracks').classList.contains('expand')) {
        player.querySelector('.wafer-tracks').classList.remove('expand');
      } else {
        player.querySelector('.wafer-tracks').classList.add('expand');
      }
    }); 

    // add event listeners to multiButton
    player.querySelector('.multi-button').addEventListener('click', function (event) {
      var t = event.target; // current class is .no-loop

      if (t.classList.contains('no-loop')) {
        t.classList.add('loop');
        t.src = t.src.replace('no-loop', 'loop');
        t.classList.remove('no-loop');
        player.classList.remove('no-loop');
        player.classList.add('loop');
        return;
      } 

      // current class is .loop
      if (t.classList.contains('loop')) {
        t.classList.add('no-loop');
        t.src = t.src.replace('loop', 'no-loop');
        t.classList.remove('loop');
        player.classList.add('no-loop');
        player.classList.remove('loop');
        return;
      }
    }); 

    // set interval for wafer listener function
    document.waferPlayerInts.push(setInterval(document.waferListener, 100, player));
  });
})();