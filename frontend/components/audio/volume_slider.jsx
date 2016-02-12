var React = require('react');
var DragDealer = require('../../../vendor/assets/javascripts/dragdealer');
var PlayingSongActions = require('../../actions/playing_song_actions');

var VolumeSlider = React.createClass({
  getInitialState: function () {
    return { volume: 1, sliderOpen: false };
  },

  componentDidMount: function () {
    var options = {
      disabled: false,
      horizontal: false,
      vertical: true,
      x: 0,
      y: 0,
      steps: 0,
      snap: false,
      speed: 1,
      slide: false,
      loose: false,
      left: 10,
      right: 10,
      callback: this.setVolume,
      animationCallback: this.setVolume
    };
    var dragDealer = new DragDealer('slider', options);
    this.setState({ dragDealer: dragDealer });
  },

  setVolume: function () {
    if (this.state.dragDealer) {
      var coord = this.state.dragDealer.getValue();
    }
    console.log('setting volume');
    // PlayingSongActions.setVolume(coord[1]);
  },

  openVolumeSlider: function () {
    this.setState({ sliderOpen: true });
  },

  closeVolumeSlider: function () {
    this.setState({ sliderOpen: false });
  },

  render: function () {
    var sliderDisplay = { display: 'block' };
    // if (this.state.sliderOpen) {
    //   sliderDisplay = { display: 'block' };
    // } else {
    //   sliderDisplay = { display: 'none' };
    // }
    return (
      <div className="volume-component group" onMouseEnter={this.openVolumeSlider}
        onMouseLeave={this.closeVolumeSlider}>
        <div className="volume-button">
          <i className="fa fa-volume-up"></i>
        </div>
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
