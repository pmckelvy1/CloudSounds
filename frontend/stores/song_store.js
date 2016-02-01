var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    SongConstants = require('../constants/song_constants');

var SongStore = new Store(Dispatcher);

var _song = {};
var _songs = {};

var resetSong = function(song) {
  _song = song;
};

var resetSongs = function(songs) {
  _songs = {};
  songs.forEach(function(song) {
    _songs[song.id] = song;
  });
};

SongStore.getNumLikesOfSong = function (songId) {
  return _songs[songId].num_likes;
};

SongStore.getSong = function () {
  return _song;
};

SongStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SongConstants.SONG_RECEIVED:
      resetSong(payload.song);
      SongStore.__emitChange();
      break;
    case SongConstants.SONGS_RECEIVED:
      resetSongs(payload.songs);
      SongStore.__emitChange();
      break;
  }
};

module.exports = SongStore;
