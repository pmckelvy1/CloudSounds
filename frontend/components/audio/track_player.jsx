var React = require('react');
var TrackWaveform = require('./track_waveform');

var TrackPlayer = React.createClass({

  render: function () {
    return (
      <div className="track-player">
        <div className="thumb-large"><img src="/assets/note.png"/></div>
        <h2 className="track-name">TRACK NAME</h2>
        <TrackWaveform />
      </div>
    );
  }

});

module.exports = TrackPlayer;
