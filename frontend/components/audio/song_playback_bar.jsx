var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlaybackBarStore = require('../../stores/playback_bar_store');

var SongPlaybackBar = React.createClass({
  getInitialState: function () {
    return { time: 0, totalTime: PlaybackBarStore.getDuration() };
  },

  componentDidMount: function () {
    var storeToken = CurrentPlayingSongStore.addListener(this.onPlayback);
    this.onPlayback();
  },

  onPlayback: function() {
    if (CurrentPlayingSongStore.isPlaying()) {
      var interval = setInterval(function () {
        this.setState({ time: PlaybackBarStore.getCurrentTime(),
          totalTime: PlaybackBarStore.getDuration() });
        }.bind(this), 10);
      this.setState({ interval: interval });
    } else {
      if (this.state.interval) {
        clearInterval(this.state.interval);
        this.setState({ interval: null });
      }
    }
  },

  render: function () {
    var widthStyle;
    var leftStyle;
    if (this.state.totalTime) {
      var currentWidth = (this.state.time / this.state.totalTime) * 500;
      leftStyle = { left: currentWidth };
      widthStyle = { width: currentWidth };
    } else {
      leftStyle = { left: 0 };
      widthStyle = { width: 0 };
    }
    return (
      <div className="playback-bar">
        <div className="status-dot"
          style={leftStyle}>
          <i className="fa fa-circle blue"></i>
        </div>
        <div className="playback-status"
          style={widthStyle}>
        </div>
      </div>
    );
  }

});

module.exports = SongPlaybackBar;
