var React = require('react');
var TrackWaveformLarge = require('./track_waveform_large');
var LikeButton = require('../buttons/like_button');

var TrackPlayerLarge = React.createClass({

  render: function () {
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    var playButton;
    if (true) {
      playButton = <div className="play-circle-large"><div className="play-triangle-large"/></div>;
    } else {
      playButton = <div className="play-circle-large"><div className="pause-large"/><div className="pause-right-large"/></div>;
    }
    return (
      <div className="track-player-large">
        <div className="play-button-large">{playButton}</div>
        <div className="thumb-large"><img src={this.props.song.image_url}/></div>
        <h1 className="track-artist-name-div-large"><a className="track-artist-name-large" href={userURL}>{this.props.song.username}</a></h1>
        <h2 className="track-title-large">{this.props.song.title}</h2>
        <TrackWaveformLarge />
      </div>
    );
  }

});

module.exports = TrackPlayerLarge;
