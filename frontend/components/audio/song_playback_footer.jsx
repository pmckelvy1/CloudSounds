var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var SongPlaybackBar = require('./song_playback_bar');

var SongPlaybackFooter = React.createClass({
  getInitialState: function () {
    return { song: CurrentPlayingSongStore.getSong() , isPlaying: CurrentPlayingSongStore.isPlaying() };
  },

  componentDidMount: function () {
    var storeToken = CurrentPlayingSongStore.addListener(this.updateSong);
    this.setState({ storeToken: storeToken });
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
  },

  updateSong: function () {
    // this.setState({ song: CurrentPlayingSongStore.getSong() });
    this.setState({ currentTime: CurrentPlayingSongStore.getCurrentTime(), isPlaying: CurrentPlayingSongStore.isPlaying() });
  },

  playPause: function () {
    PlayingSongActions.playPause();
  },

  lastSong: function () {
    PlayingSongActions.lastSong();
  },

  nextSong: function () {
    PlayingSongActions.nextSong();
  },

  render: function () {
    var playButton;
    if (!this.state.isPlaying) {
      playButton = <button onClick={this.playPause}>
        <div className="playback-play-button">
          <i className="fa fa-play fa-2x"></i>
        </div>
      </button>;
    } else {
      playButton = <button onClick={this.playPause}>
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
