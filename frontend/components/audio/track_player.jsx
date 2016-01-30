var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');

var TrackPlayer = React.createClass({

  render: function () {
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    return (
      <div className="track-player">
        <div className="thumb"><img src={this.props.song.image_url}/></div>
        <h1 className="track-artist-name"><a href={userURL}>{this.props.song.username}</a></h1>
        <h2 className="track-title"><a href={songURL}>{this.props.song.title}</a></h2>
        <TrackWaveform />
        <LikeButton className="like-button" song={this.props.song}/>
      </div>
    );
  }

});

module.exports = TrackPlayer;
