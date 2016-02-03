var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var ApiActions = require('../../actions/api/api_actions');

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
      return (
        <ul className="playlist-selection-dialog group">
          {playlists}
        </ul>
      );
    } else {
      return (
        <button className="add-to-playlist-button" onClick={this.openPlaylistDialog}><i className="fa fa-th-list"></i> Add to playlist</button>
      );
    }
  }
});

module.exports = AddToPlaylist;
