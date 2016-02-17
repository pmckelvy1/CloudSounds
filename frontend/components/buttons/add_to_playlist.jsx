var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var ApiActions = require('../../actions/api/api_actions');
var NewPLaylist = require('./new_playlist');

var AddToPlaylist = React.createClass({
  getInitialState: function () {
    return { dialogOpen: false };
  },

  openPlaylistDialog: function (e) {
    this.setState({ dialogOpen: true });
  },

  addToPlaylist: function (e) {
    var playlistId = e.currentTarget.dataset.id;
    ApiActions.addSongToPlaylist(playlistId, this.props.song.id);
    this.setState({ dialogOpen: false });
  },

  closeDialog: function (e) {
    this.setState({ dialogOpen: false });
  },

  render: function () {
    if (this.state.dialogOpen) {
      var playlists = [];
      var userPlaylists = CurrentUserStore.playlists();
      userPlaylists.forEach(function (playlist) {
        playlists.push(
          <li key={playlist.id}>
            <button onClick={this.addToPlaylist} data-id={playlist.id} className="playlist-selection-item">
              {playlist.title}
            </button>
          </li>
        );
      }.bind(this));
      if (this.props.large) {
        return (
          <div className="large-dialog-container">
            <ul className="playlist-selection-dialog-large group" onMouseLeave={this.closeDialog}>
              {playlists}
              <NewPLaylist song={this.props.song} />
            </ul>
          </div>
        );
      } else {
        return (
          <div className="dialog-container group">
            <ul className="playlist-selection-dialog group" onMouseLeave={this.closeDialog}>
              {playlists}
              <NewPLaylist song={this.props.song} />
            </ul>
          </div>
        );
      }
    } else {
      if (this.props.large) {
        return (
          <button className="add-to-playlist-button-large" onClick={this.openPlaylistDialog}><i className="fa fa-th-list"></i> Add to playlist</button>
        );
      } else {
        return (
          <button className="add-to-playlist-button" onClick={this.openPlaylistDialog}><i className="fa fa-th-list"></i> Add to playlist</button>
        );
      }
    }
  }
});

module.exports = AddToPlaylist;
