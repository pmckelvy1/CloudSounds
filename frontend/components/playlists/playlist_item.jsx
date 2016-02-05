var React = require('react');
var TrackStats = require('../audio/track_stats');
var CurrentUserStore = require('../../stores/current_user_store');

var PlaylistItem = React.createClass({

  render: function () {
    var songURL = '#/songs/' + this.props.playlistItem.song.id;
    var deleteButton;
    if (CurrentUserStore.currentUserId() === this.props.playlistOwnerId) {
      deleteButton = <button data-id={this.props.playlistItem.id} onClick={this.props.deleteFromPlaylist} className="playlist-item-delete-button">Delete</button>;
    } else {
      deleteButton = <div></div>;
    }
    return (
      <div className="playlist-item">
        <div className="plalist-item-info">
          <img className="playlist-item-thumb-tiny" src={this.props.playlistItem.song.image_url} />
          <div className="playlist-item-song-title"><button data-id={this.props.playlistItem.song.id} onClick={this.props.playSong}>{this.props.playlistItem.song.title}</button></div>
          <div className="track-stats-playlist-item">
            <TrackStats song={this.props.playlistItem.song}/>
          </div>
          {deleteButton}
        </div>
      </div>
    );
  }
});

module.exports = PlaylistItem;
