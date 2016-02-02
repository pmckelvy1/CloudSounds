// var Store = require('flux/utils').Store;
// var Dispatcher = require('../dispatcher/dispatcher');
// var PlayingSongConstants = require('../constants/playing_song_constants');
//
// var PlaybackBarStore = new Store(Dispatcher);
//
// var _queuedSongsIdArray = [];
// var _pastSongsIdArray = [];
// var _songs = {};
// var _currentSong = null;
//
// var addSong = function (WSObject) {
//   if (_currentSong) {
//     _queuedSongsIdArray.push(WSObject.id);
//     _songs[WSObject.id] = WSObject;
//   } else {
//     _songs[WSObject.id] = WSObject;
//     _currentSong = WSObject;
//   }
// };
//
// var nextSong = function () {
//   // _pastSongs.push(Object.assign({}, _currentSong));
//   _currentSong.wavesurfer.pause();
//   _pastSongsIdArray.push(_currentSong.id);
//   var nextId = _queuedSongsIdArray.shift();
//   _currentSong = _songs[nextId];
// };
//
// var lastSong = function () {
//   // _queuedSongsIdArray.unshift(Object.assign({}, _currentSong));
//   _currentSong.wavesurfer.pause();
//   _queuedSongsIdArray.unshift(_currentSong.id);
//   var lastId = _pastSongsIdArray.pop();
//   _currentSong = _songs[lastId];
// };
//
// var playSong = function () {
//   if (_currentSong) {
//     _currentSong.wavesurfer.play();
//   }
// };
//
// var pauseSong = function () {
//   if (_currentSong) {
//     _currentSong.wavesurfer.pause();
//   }
// };
//
// PlaybackBarStore.getCurrentTime = function () {
//   if (_currentSong) {
//     return _currentSong.getCurrentTime();
//   }
// };
//
// PlaybackBarStore.getDuration = function () {
//   if (_currentSong) {
//     return _currentSong.getDuration();
//   }
// };
//
// PlaybackBarStore.__onDispatch = function (payload) {
//   switch(payload.actionType) {
//     case PlayingSongConstants.NEW_SONG:
//       addSong(payload.WSObject);
//       PlaybackBarStore.__emitChange();
//       break;
//     case PlayingSongConstants.NEXT_SONG:
//       nextSong();
//       PlaybackBarStore.__emitChange();
//       break;
//     case PlayingSongConstants.LAST_SONG:
//       lastSong();
//       PlaybackBarStore.__emitChange();
//       break;
//     case PlayingSongConstants.PLAY_SONG:
//       playSong();
//       CurrentPlayingSongStore.__emitChange();
//       break;
//     case PlayingSongConstants.PAUSE_SONG:
//       pauseSong();
//       CurrentPlayingSongStore.__emitChange();
//       break;
//   }
// };
//
// module.exports = PlaybackBarStore;
