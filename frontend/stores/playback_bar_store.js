var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var PlayingSongConstants = require('../constants/playing_song_constants');

var PlaybackBarStore = new Store(Dispatcher);

var _currentSong = null;
var _queuedSongs = [];
var _pastSongs = [];

var resetSong = function(song) {
  _currentSong = song;
};

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

PlaybackBarStore.getCurrentTime = function () {
  if (_currentSong) {
    return Math.fround(_currentSong.getCurrentTime());
  }
};

PlaybackBarStore.getDuration = function () {
  if (_currentSong) {
    return Math.fround(_currentSong.getDuration());
  }
};

PlaybackBarStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PlayingSongConstants.NEW_SONG:
      addSong(payload.wavesurfer);
      PlaybackBarStore.__emitChange();
      break;
    case PlayingSongConstants.NEXT_SONG:
      nextSong();
      PlaybackBarStore.__emitChange();
      break;
    case PlayingSongConstants.LAST_SONG:
      lastSong();
      PlaybackBarStore.__emitChange();
      break;
  }
};

module.exports = PlaybackBarStore;
