var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var PlayingSongConstants = require('../constants/playing_song_constants');

var CurrentPlayingSongStore = new Store(Dispatcher);

_queuedSongs = {};
_currentSong = null;

var playSong = function () {
  _currentSong.playPause();
};

var pauseSong = function () {
  _currentSong.playPause();
};

var playPause = function () {
  _currentSong.playPause();
};

var resetSong = function (song) {
  if (_currentSong && _currentSong.isPlaying()) {
    _currentSong.playPause();
  }
  _currentSong = song;
};

CurrentPlayingSongStore.getSong = function () {
  return _currentSong;
};

CurrentPlayingSongStore.getCurrentTime = function () {
  return _currentSong.getCurrentTime();
};

CurrentPlayingSongStore.isPlaying = function () {
  if (_currentSong) {
    return _currentSong.isPlaying();
  } else {
    return false;
  }
};


CurrentPlayingSongStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PlayingSongConstants.PLAY_SONG:
      playSong();
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.PAUSE_SONG:
      pauseSong();
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.NEW_SONG:
      resetSong(payload.wavesurfer);
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.PLAY_PAUSE:
      playPause();
      CurrentPlayingSongStore.__emitChange();
      break;
  }
};

module.exports = CurrentPlayingSongStore;
