var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');

var SongPlaybackBar = React.createClass({
  getInitialState: function () {
    return { time: 0, totalTime: CurrentPlayingSongStore.getDuration() };
  },

  componentDidMount: function () {
    var storeToken = CurrentPlayingSongStore.addListener(this.onPlayback);
    this.onPlayback();
  },

  onPlayback: function() {
    if (CurrentPlayingSongStore.isPlaying()) {
      var interval = setInterval(function () {
        this.setState({ time: CurrentPlayingSongStore.getCurrentTime(),
          totalTime: CurrentPlayingSongStore.getDuration() });
        }.bind(this), 60);
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

    var currentTime;
    var totalTime = null;
    var convertedCT;
    var convertedTT;
    if (this.state.time) {
      currentTime = Math.floor(this.state.time);
      convertedCT = this._convertTime(currentTime);
    } else {
      convertedCT = 0;
    }
    if (this.state.totalTime) {
      totalTime = Math.floor(this.state.totalTime);
      convertedTT = this._convertTime(totalTime);
    }

    return (
      <div className="footer-playback-container">
        <div className="current-time">{convertedCT}</div>
        <div className="playback-bar">
          <div className="status-dot"
            style={leftStyle}>
            <i className="fa fa-circle blue"></i>
          </div>
          <div className="playback-status"
            style={widthStyle}>
          </div>
          <div className="playback-status-incomplete"></div>
        </div>
        <div className="total-time">{convertedTT}</div>
      </div>
    );
  },

  _convertTime: function (totalSec) {
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = totalSec % 60;
    hours = (hours === 0 ? "" : hours + ":");
    // hours = (hours < 10 ? "0" + hours : hours);

    var result = hours + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
  }

});

module.exports = SongPlaybackBar;
