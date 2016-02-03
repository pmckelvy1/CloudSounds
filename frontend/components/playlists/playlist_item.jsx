var React = require('react');
var TrackStats = require('../audio/track_stats');

var PlaylistItem = React.createClass({

  render: function () {
    var songURL = '#/songs/' + this.props.song.id;
    return (
      <div className="playlist-item">
        <div className="plalist-item-info">
          <img className="playlist-item-thumb-tiny" src={this.props.song.image_url} />
          <div className="playlist-item-song-title"><button data-id={this.props.song.id} onClick={this.props.playSong}>{this.props.song.title}</button></div>
        </div>
        <div className="track-stats-playlist-item">
          <TrackStats song={this.props.song}/>
        </div>
      </div>
    );
  }
});

module.exports = PlaylistItem;
