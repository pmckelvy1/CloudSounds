var PlaylistConstants = require('../constants/playlist_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var PlaylistActions = {
  addSongToPlaylist: function (addedSongData) {
    Dispatcher.dispatch({
      actionType: PlaylistConstants.ADD_SONG_TO_PLAYLIST,
      addedSongData: addedSongData
    });
  }
};

module.exports = PlaylistActions;
