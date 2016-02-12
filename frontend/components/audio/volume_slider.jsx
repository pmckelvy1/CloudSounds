var React = require('react');
var DragDealer = require('../../../vendor/assets/javascripts/dragdealer');
var PlayingSongActions = require('../../actions/playing_song_actions');

var VolumeSlider = React.createClass({
  getInitialState: function () {
    return { volume: 1 };
  },

  componentDidMount: function () {
    var options = {
      disabled: false,
      verticle: true,
      x: 0,
      y: 1,
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
    // PlayingSongActions.setVolume(coord[1]);
  },

  render: function () {
    return (
      <div className="volume-component">
        <div className="volume-button">
          <i className="fa fa-volume-up"></i>
        </div>
        <div className="volume-slider dragdealer">
          <div className="volume-state-bar"></div>
          <div className="volume-potential-bar"></div>
          <div className="volume-handle handle">
            <i className="fa fa-minus-square fa-2x"></i>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = VolumeSlider;
