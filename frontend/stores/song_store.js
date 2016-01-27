var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    SongConstants = require('../constants/song_constants');

var SongStore = new Store(Dispatcher);

var _songs = {};

var resetSongs = function(songs) {
  _songs = {};
  songs.forEach(function (song) {
    _songs[song.id] = song;
  });
};

var addSong = function(song) {
  _songs[song.id] = song;
};

var addSongs = function(songs) {
  songs.forEach(function (song) {
    _songs[song.id] = song;
  });
};

SongStore.all = function () {
  var songs = [];
  for (var id in _songs) {
    songs.push(_songs[id]);
  }
  return songs;
};

SongStore.allUserSongs = function (userId) {
  var songs = [];
  for (var id in _songs) {
    if (_songs[id].user_id === parseInt(userId)) {
      songs.push(_songs[id]);
    }
  }
  return songs;
};

SongStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SongConstants.SONGS_RECEIVED:
      resetSongs(payload.songs);
      SongStore.__emitChange();
      break;
    case SongConstants.SONG_RECEIVED:
      addSong(payload.song);
      SongStore.__emitChange();
      break;
    case SongConstants.USER_SONGS_RECEIVED:
      addSongs(payload.songs);
      SongStore.__emitChange();
      break;
  }
};

module.exports = SongStore;
