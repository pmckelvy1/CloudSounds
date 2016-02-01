var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');

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

  render: function () {
    var playButton;
    if (this.state.isPlaying) {
      playButton = <button onClick={this.playPause} className="playback-play-button">
        <div className="playback-play-triangle"></div>
      </button>;
    } else {
      playButton = <button onClick={this.playPause} className="playback-play-button">
        <div className="playback-pause-left"></div>
        <div className="playback-pause-right"></div>
      </button>;
    }

    return (
      <div className="footer">
        <div className="footer-song-playback">
          <div className="playback-footer-play-pause-button">
          <div className="footer-playback-container">
          {this.state.currentTime}
          {playButton}
          </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = SongPlaybackFooter;
