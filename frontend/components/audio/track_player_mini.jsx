var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');

var TrackPlayerMini = React.createClass({

  render: function () {
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    var playButton;
    if (true) {
      playButton = <div className="play-circle-mini"><div className="play-triangle-mini"/></div>;
    } else {
      playButton = <div className="play-circle-mini"><div className="pause-mini"/><div className="pause-right-mini"/></div>;
    }
    return (
      <div className="track-player-mini">
        <div className="thumb-mini"><img src={this.props.song.image_url}/></div>
        <div className="play-button-mini">{playButton}</div>
        <h1 className="artist-name-mini"><a href={userURL}>{this.props.song.username}</a></h1>
        <h2><a href={songURL}>{this.props.song.title}</a></h2>
        <div className="buttons group">
          <LikeButton song={this.props.song}/>
        </div>
      </div>
    );
  }

});

module.exports = TrackPlayerMini;
