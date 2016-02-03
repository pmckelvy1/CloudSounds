var SongConstants = require('../constants/song_constants'),
    Dispatcher = require('../dispatcher/dispatcher'),
    ApiUtil = require('../util/api_util');

var SongActions = {
  receiveUserSongs: function(songs) {
    Dispatcher.dispatch({
      actionType: SongConstants.USER_SONGS_RECEIVED,
      songs: songs
    });
  },

  receiveSingleSong: function(song) {
    Dispatcher.dispatch({
      actionType: SongConstants.SONG_RECEIVED,
      song: song
    });
  },

  receiveAllSongs: function(songs) {
    Dispatcher.dispatch({
      actionType: SongConstants.SONGS_RECEIVED,
      songs: songs
    });
  },

  receivePageSongs: function(songs) {
    Dispatcher.dispatch({
      actionType: SongConstants.SONGS_RECEIVED,
      songs: songs
    });
  },

  receiveNumPlays: function(playData) {
    Dispatcher.dispatch({
      actionType: SongConstants.NUM_PLAYS_RECEIVED,
      playData: playData
    });
  }
};

module.exports = SongActions;
