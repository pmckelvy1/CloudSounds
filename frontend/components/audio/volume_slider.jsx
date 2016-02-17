var React = require('react');
var DragDealer = require('../../../vendor/assets/javascripts/dragdealer');
var PlayingSongActions = require('../../actions/playing_song_actions');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');

var VolumeSlider = React.createClass({
  getInitialState: function () {
    return { volume: 1, sliderOpen: false, muted: false };
  },

  componentDidMount: function () {
    var options = {
      disabled: false,
      horizontal: false,
      vertical: true,
      x: 0,
      y: 0,
      css3: false,
      steps: 0,
      snap: false,
      speed: 1,
      slide: false,
      loose: false,
      left: 10,
      right: 10,
      dragStartCallback: this.test,
      callback: this.setVolume,
      animationCallback: this.setVolume
    };
    var dragDealer = new DragDealer('slider', options);
    this.setState({ dragDealer: dragDealer });
  },

  test: function () {
  },

  setVolume: function () {
    if (this.state.dragDealer) {
      var coord = this.state.dragDealer.getValue();
    }
    // PlayingSongActions.setVolume(coord[1]);
  },

  openVolumeSlider: function () {
    this.setState({ sliderOpen: true });
  },

  closeVolumeSlider: function () {
    this.setState({ sliderOpen: false });
  },

  toggleMute: function () {
    PlayingSongActions.toggleMute();
    this.setState({ muted: !this.state.muted });
  },

  render: function () {
    var sliderDisplay = { display: 'none' };
    // if (this.state.sliderOpen) {
    //   sliderDisplay = { display: 'block' };
    // } else {
    //   sliderDisplay = { display: 'none' };
    // }
    var volumeButton;
    if (this.state.muted) {
      volumeButton = <i className="fa fa-volume-off"></i>;
    } else {
      volumeButton = <i className="fa fa-volume-up"></i>;
    }

    return (
      <div className="volume-component group" onMouseEnter={this.openVolumeSlider}
        onMouseLeave={this.closeVolumeSlider}>
        <button className="volume-button" onClick={this.toggleMute}>
          {volumeButton}
        </button>
        <div id="slider" className="volume-slider draggable dragdealer"
          style={sliderDisplay} role="progressbar" aria-valuemin='0'
          aria-valuemax='150' aria-valuenow={this.state.volume}>
          <div className="volume-slider-handle handle">
            <i className="fa fa-minus-square"></i>
          </div>
          <div className="volume-state-bar"></div>
          <div className="volume-potential-bar"></div>
        </div>
      </div>
    );
  }
});

module.exports = VolumeSlider;
