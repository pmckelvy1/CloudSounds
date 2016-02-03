var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var SongPlaybackBar = require('./song_playback_bar');
var PlaybackFunctions = require('../../mixins/playback_functions');
var CurrentUserStore = require('../../stores/current_user_store');

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
    if (!CurrentUserStore.isLoggedIn()) {
      return (
        <div></div>
      );
    } else {
      var playButton;
      var forwardButton;
      var backButton;

      if (!this.isPlaying()) {
        playButton = <button onClick={this.pP}>
          <div className="playback-play-button">
            <i className="fa fa-play fa-2x"></i>
          </div>
        </button>;
      } else {
        playButton = <button onClick={this.pP}>
          <div className="playback-pause-button">
            <i className="fa fa-pause fa-2x"></i>
          </div>
        </button>;
      }

      if (CurrentPlayingSongStore.hasNext()) {
        forwardButton = <div className="next-song-button">
          <button onClick={this.nextSong}>
          <i className="fa fa-step-forward fa-2x"></i>
          </button>
        </div>;
      } else {
        forwardButton = <div className="next-song-button disabled">
          <button disabled="true">
          <i className="fa fa-step-forward fa-2x"></i>
          </button>
        </div>;
      }

      if (CurrentPlayingSongStore.hasPrev()) {
        backButton = <div className="last-song-button">
          <button onClick={this.lastSong}>
          <i className="fa fa-step-backward fa-2x"></i>
          </button>
        </div>;
      } else {
        backButton = <div className="last-song-button disabled">
          <button disabled="true">
          <i className="fa fa-step-backward fa-2x"></i>
          </button>
        </div>;
      }

      return (
        <div className="footer">
          <div className="footer-song-playback">
            {backButton}
            <div className="playback-footer-play-pause-button">
              {playButton}
            </div>
            {forwardButton}
            <SongPlaybackBar />
          </div>
        </div>
      );
    }
  }

});

module.exports = SongPlaybackFooter;
