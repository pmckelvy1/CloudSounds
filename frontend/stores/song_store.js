var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    SongConstants = require('../constants/song_constants');

var SongStore = new Store(Dispatcher);

var _song = {};

var resetSong = function(song) {
  _song = song;
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
  }
};

module.exports = SongStore;
