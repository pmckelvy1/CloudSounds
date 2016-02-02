var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var PlayingSongConstants = require('../constants/playing_song_constants');

var CurrentPlayingSongStore = new Store(Dispatcher);

var _queuedSongs = [];
var _pastSongs = [];
var _currentSong = null;

var addSong = function (wavesurfer) {
  if (_currentSong) {
    _queuedSongs.push(wavesurfer);
  } else {
    _currentSong = wavesurfer;
  }
};

var nextSong = function () {
  _pastSongs.push(Object.assign({}, _currentSong));
  _currentSong = _queuedSongs.shift();
};

var lastSong = function () {
  _queuedSongs.unshift(Object.assign({}, _currentSong));
  _currentSong = _pastSongs.pop();
};

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
  return Math.fround(_currentSong.getCurrentTime());
};

CurrentPlayingSongStore.isPlaying = function () {
  if (_currentSong) {
    return _currentSong.isPlaying();
  } else {
    return false;
  }
};

CurrentPlayingSongStore.getDuration = function () {
  if (_currentSong) {
    return Math.fround(_currentSong.getDuration());
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
      addSong(payload.wavesurfer);
      // resetSong(payload.wavesurfer);
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.NEXT_SONG:
      nextSong();
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.LAST_SONG:
      lastSong();
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.PLAY_PAUSE:
      playPause();
      CurrentPlayingSongStore.__emitChange();
      break;
  }
};

module.exports = CurrentPlayingSongStore;
