var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var SongPlaybackBar = require('./song_playback_bar');
var PlaybackFunctions = require('../../mixins/playback_functions');

var SongPlaybackFooter = React.createClass({

  getInitialState: function () {
    return { WSObject: CurrentPlayingSongStore.getSong() , isPlaying: CurrentPlayingSongStore.isPlaying() };
  },

  componentDidMount: function () {
    var storeToken = CurrentPlayingSongStore.addListener(this.setPlayStatus);
    this.setState({ storeToken: storeToken });
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
  },

  // setPlayStatus: function () {
  //   this.setState({ currentTime: CurrentPlayingSongStore.getCurrentTime(),
  //     isPlaying: CurrentPlayingSongStore.isPlaying(), });
  // },

  // setPlayStatus: function () {
  //   this.setState({ WSObject: CurrentPlayingSongStore.getSong() });
  //   // this.setState({ song: CurrentPlayingSongStore.getSong() });
  //   if (this.state.WSObject && (this.state.WSObject.id === CurrentPlayingSongStore.getSong().id)) {
  //     if (CurrentPlayingSongStore.isPlaying()) {
  //       this.state.WSObject.wavesurfer.play(CurrentPlayingSongStore.getCurrentTime());
  //     } else {
  //       if (this.state.WSObject.wavesurfer.isPlaying()) {
  //         this.state.WSObject.wavesurfer.pause();
  //       } else {
  //         this.state.WSObject.wavesurfer.play();
  //       }
  //     }
  //     this.setState({ currentTime: CurrentPlayingSongStore.getCurrentTime(),
  //       isPlaying: CurrentPlayingSongStore.isPlaying() });
  //   } else if (this.state.WSObject && (this.state.WSObject.id !== CurrentPlayingSongStore.getSong().id)) {
  //     this.setState({ WSObject: CurrentPlayingSongStore.getSong(),
  //       currentTime: CurrentPlayingSongStore.getCurrentTime(),
  //       isPlaying: CurrentPlayingSongStore.isPlaying() });
  //     if (CurrentPlayingSongStore.isPlaying()) {
  //       this.state.WSObject.wavesurfer.play(CurrentPlayingSongStore.getCurrentTime());
  //     } else {
  //       this.state.WSObject.wavesurfer.pause();
  //     }
  //   }
  // },
  playPause: function () {
    PlayingSongActions.playPause();
  },

  isPlaying: function () {
    return CurrentPlayingSongStore.isPlaying();
  },

  setPlayStatus: function () {
    this.setState({});
  },

  pP: function () {
    PlayingSongActions.playPause();
  },

  play: function () {
    PlayingSongActions.play();
  },

  pause: function () {
    PlayingSongActions.pause();
  },

  lastSong: function () {
    PlayingSongActions.lastSong();
  },

  nextSong: function () {
    PlayingSongActions.nextSong();
  },

  render: function () {
    var playButton;
    if (!this.isPlaying()) {
      // if (this.state.WSObject) {
      //   this.state.WSObject.wavesurfer.play();
      // }
      playButton = <button onClick={this.pP}>
        <div className="playback-play-button">
          <i className="fa fa-play fa-2x"></i>
        </div>
      </button>;
    } else {

      // if (this.state.WSObject) {
      //   this.state.WSObject.wavesurfer.pause();
      // }
      playButton = <button onClick={this.pP}>
        <div className="playback-pause-button">
          <i className="fa fa-pause fa-2x"></i>
        </div>
      </button>;
    }

    return (
      <div className="footer">
        <div className="footer-song-playback">
          <div className="last-song-button">
            <button onClick={this.lastSong}>
              <i className="fa fa-step-backward fa-2x"></i>
            </button>
          </div>
          <div className="playback-footer-play-pause-button">
            {playButton}
          </div>
          <div className="next-song-button">
            <button onClick={this.nextSong}>
              <i className="fa fa-step-forward fa-2x"></i>
            </button>
          </div>
          <SongPlaybackBar />
        </div>
      </div>
    );
  }

});

module.exports = SongPlaybackFooter;
