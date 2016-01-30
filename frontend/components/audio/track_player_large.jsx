var React = require('react');
var TrackWaveformLarge = require('./track_waveform_large');
var LikeButton = require('../buttons/like_button');

var TrackPlayerLarge = React.createClass({

  render: function () {
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    return (
      <div className="track-player-large">
        <div className="thumb-large"><img src={this.props.song.image_url}/></div>
        <h1 className="track-artist-name-div"><a className="track-artist-name-large" href={userURL}>{this.props.song.username}</a></h1>
        <h2 className="track-title-large">{this.props.song.title}</h2>
        <TrackWaveformLarge />
        <LikeButton className="like-button" song={this.props.song}/>
        <div className="play-circle"><div className="pause"/><div className="pause-right"/></div>
        <div className="play-circle"><div className="play-triangle"/></div>
      </div>
    );
  }

});

module.exports = TrackPlayerLarge;
