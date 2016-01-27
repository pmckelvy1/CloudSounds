var React = require('react');
var TrackWaveform = require('./track_waveform');

var TrackPlayer = React.createClass({

  render: function () {
    return (
      <div className="track-player">
        <div className="thumb-large"><img src="/assets/note.png"/></div>
        <h1 className="track-artist-name">ARTIST NAME</h1>
        <h2 className="track-name">{this.props.song.title}</h2>
        <h3 className="track-info">{this.props.song.info}</h3>
        <TrackWaveform />
      </div>
    );
  }

});

module.exports = TrackPlayer;
