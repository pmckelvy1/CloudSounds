var React = require('react');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var DragDealer = require('../../../vendor/assets/javascripts/dragdealer');

var SongPlaybackBar = React.createClass({
  getInitialState: function () {
    return { time: 0, totalTime: CurrentPlayingSongStore.getDuration(),
      dragging: false };
  },

  componentDidMount: function () {
    var storeToken = CurrentPlayingSongStore.addListener(this.onPlayback);
    this.onPlayback();
    var options = {
      disabled: false,
      verticle: false,
      x: 0,
      y: 0,
      steps: 0,
      snap: false,
      speed: 1,
      slide: false,
      loose: false,
      top: 10,
      bottom: 10,
      callback: this.setPlaybackState,
      animationCallback: this.renderDraggingDot
    };
    var dragDealer = new DragDealer('slider', options);
    this.setState({ dragDealer: dragDealer });
  },

  setPlaybackState: function (x) {
    CurrentPlayingSongStore.seekTo(x);
    $('.handle').css('transform', 'translateX(0px)');
    this.setState({ dragging: false });
  },

  renderDraggingDot: function (x) {
    if (this.state.dragDealer){
      var coords = this.state.dragDealer.getValue();
      var currentWidth = coords[0] * 500;
      var leftStyle = { left: currentWidth };
      var widthStyle = { width: currentWidth };

      this.setState({ leftStyle: leftStyle,
        widthStyle: widthStyle,
        currentPercent: coords[0],
        dragging: true
      });
    }
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
    var currentTime;
    var totalTime = null;
    var convertedCT;
    var convertedTT;

    var widthStyle;
    var leftStyle;
    var currentWidth;

    if (!this.state.dragging) {

      if (this.state.totalTime) {
        currentWidth = (this.state.time / this.state.totalTime) * 500;
        leftStyle = { left: currentWidth };
        widthStyle = { width: currentWidth };
      } else {
        leftStyle = { left: 0 };
        widthStyle = { width: 0 };
      }

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
        <div className="footer-playback-container group">
          <div className="current-time">{convertedCT}</div>
          <div id='slider' className="playback-bar-dot draggable dragdealer" role="progressbar"
            aria-valuemax={this.state.totalTime} aria-valuenow={this.state.time}
            aria-valuemin='0'>
            <div className="status-dot handle"
              style={leftStyle}>
              <i className="fa fa-circle blue"></i></div>
              <div className="under-bar">
                <div className="playback-status"
                  style={widthStyle}>
                </div>
                <div className="playback-status-incomplete"></div>
              </div>
          </div>
          <div className="total-time">{convertedTT}</div>
        </div>
      );
    } else {

      if (this.state.time) {
        currentTime = Math.floor((this.state.currentPercent * this.state.totalTime));
        convertedCT = this._convertTime(currentTime);
      } else {
        convertedCT = 0;
      }
      if (this.state.totalTime) {
        totalTime = Math.floor(this.state.totalTime);
        convertedTT = this._convertTime(totalTime);
      }

      return (
        <div className="footer-playback-container group">
          <div className="current-time">{convertedCT}</div>
          <div id='slider' className="playback-bar-dot draggable dragdealer" role="progressbar"
            aria-valuemax={this.state.totalTime} aria-valuenow={this.state.time}
            aria-valuemin='0'>
            <div className="status-dot handle">
              <i className="fa fa-circle blue"></i>
              </div>
              <div className="under-bar">
                <div className="playback-status"
                  style={this.state.widthStyle}>
                </div>
                <div className="playback-status-incomplete"></div>
              </div>
          </div>
          <div className="total-time">{convertedTT}</div>
        </div>
      );
    }


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
