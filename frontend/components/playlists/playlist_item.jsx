var React = require('react');
var TrackStats = require('../audio/track_stats');

var PlaylistItem = React.createClass({

  render: function () {
    var songURL = '#/songs/' + this.props.song.id;
    return (
      <div className="playlist-item">
        <div className="plalist-item-info">
          <img className="thumb-tiny" src={this.props.song.image_url} />
          <div className="song-title"><a href={songURL}>{this.props.song.title}</a></div>
        </div>
        <div className="track-stats-reg">
          <TrackStats song={this.props.song}/>
        </div>
      </div>
    );
  }
});

module.exports = PlaylistItem;
