var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var PlayingSongConstants = require('../constants/playing_song_constants');

var PlaybackBarStore = new Store(Dispatcher);

var _currentSong = null;

var resetSong = function(song) {
  _currentSong = song;
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
      resetSong(payload.wavesurfer);
      PlaybackBarStore.__emitChange();
      break;
  }
};

module.exports = PlaybackBarStore;
