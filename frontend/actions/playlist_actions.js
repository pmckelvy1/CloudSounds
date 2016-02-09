var PlaylistConstants = require('../constants/playlist_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var PlaylistActions = {
  addSongToPlaylist: function (addedSongData) {
    Dispatcher.dispatch({
      actionType: PlaylistConstants.ADD_SONG_TO_PLAYLIST,
      addedSongData: addedSongData
    });
  },

  addNewPlaylist: function (newPlaylist) {
    Dispatcher.dispatch({
      actionType: PlaylistConstants.ADD_NEW_PLAYLIST,
      newPlaylist: newPlaylist
    });
  },

  removeSongFromPlaylist: function (deletedItem) {
    Dispatcher.dispatch({
      actionType: PlaylistConstants.REMOVE_SONG_FROM_PLAYLIST,
      deletedItem: deletedItem
    });
  },

  invalidPlaylistAddition: function (playlistItem) {
    Dispatcher.dispatch({
      actionType: PlaylistConstants.INVALID_PLAYLIST_ADDITION,
      playlistItem: playlistItem
    });
  }
};

module.exports = PlaylistActions;
