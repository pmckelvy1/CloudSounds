var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var PlayingSongConstants = require('../constants/playing_song_constants');

var CurrentPlayingSongStore = new Store(Dispatcher);

var _queuedSongsIdArray = [];
var _pastSongsIdArray = [];
var _songs = {};
var _currentSong = null;
var _currentTime = 0;

var collectGarbage = function () {
  var id;
  if (_queuedSongsIdArray.length > 10) {
    id = _queuedSongsIdArray.shift();
    delete _songs[id];
  }
  if (_pastSongsIdArray.length > 3) {
    id = _pastSongsIdArray.shift();
    delete _songs[id];
  }
};

var addSong = function (WSObject) {
  if (_currentSong) {
    if (!_songs[WSObject.id]){
      _queuedSongsIdArray.push(WSObject.id);
      _songs[WSObject.id] = WSObject;
    }
  } else {
    if (!_songs[WSObject.id]){
      _songs[WSObject.id] = WSObject;
      _currentSong = WSObject;
    }
  }
  collectGarbage();
};

var addSongs = function (WSPlaylist) {
  WSPlaylist.forEach(function(WSObject) {
    if (_currentSong) {
      if (!_songs[WSObject.id]){
        _queuedSongsIdArray.push(WSObject.id);
        _songs[WSObject.id] = WSObject;
      } else {
        _queuedSongsIdArray.push(WSObject.id);
      }
    } else {
      if (!_songs[WSObject.id]){
        _songs[WSObject.id] = WSObject;
        _currentSong = WSObject;
      }
    }
    collectGarbage();
  });
};

var nextSong = function () {
  // _pastSongs.push(Object.assign({}, _currentSong));
  if (_currentSong.wavesurfer.isPlaying()) {
    _currentSong.wavesurfer.pause();
  }
  _pastSongsIdArray.push(_currentSong.id);
  var nextId = _queuedSongsIdArray.shift();
  _currentSong = _songs[nextId];
  _currentSong.wavesurfer.play();
  collectGarbage();
};

var lastSong = function () {
  // _queuedSongsIdArray.unshift(Object.assign({}, _currentSong));
  if (_currentSong.wavesurfer.isPlaying()) {
    _currentSong.wavesurfer.pause();
  }
  _queuedSongsIdArray.unshift(_currentSong.id);
  var lastId = _pastSongsIdArray.pop();
  _currentSong = _songs[lastId];
  _currentSong.wavesurfer.play();
};

var playSong = function () {
  if (_currentSong) {
    _currentSong.wavesurfer.play(_currentTime);
  }
};

var pauseSong = function () {
  if (_currentSong) {
    _currentSong.wavesurfer.pause();
    _currentTime = _currentSong.wavesurfer.getCurrentTime();
  }
};

var queueSong = function (songId) {
  // DEQUEUE CURRENT SONG
  _pastSongsIdArray.push(_currentSong.id);

  // REMOVE SONG FROM EITHER ARRAY
  var allSongsIds = _queuedSongsIdArray + _pastSongsIdArray;
  var idx = allSongsIds.indexOf(songId);
  if (idx >= _queuedSongsIdArray.length) {
    _pastSongsIdArray.splice(idx - _queuedSongsIdArray.length, 1);
  } else {
    _queuedSongsIdArray.splice(idx, 1);
  }

  // SET CURRENT SONG TO NEW SONG
  _currentSong = _songs[songId];

  // PLAY IT
  _currentSong.wavesurfer.play();
};

var playPause = function (songId) {
  if (songId) {
    if (_currentSong.id !== songId) {
      if (_currentSong.wavesurfer.isPlaying()) {
        _currentSong.wavesurfer.pause();
      }
      queueSong(songId);
    } else {
      _currentSong.wavesurfer.playPause();
    }
  } else {
    _currentSong.wavesurfer.playPause();
  }
};

var resetSong = function (WSObject) {
  if (_currentSong && _currentSong.wavesurfer.isPlaying()) {
    _currentSong.wavesurfer.pause();
    _pastSongsIdArray.push(_currentSong.id);
  }
  _currentSong = WSObject;
};

CurrentPlayingSongStore.remount = function (songId, height) {
  var selector = '.wave' + songId;
  var WSObject = _songs[songId];

  var container = $(selector)[0];
  var wavesurfer = WSObject.wavesurfer;
  var child = wavesurfer.container.children[0];

  container.appendChild(child);

  wavesurfer.container = container;
  wavesurfer.mediaContainer = container;
  wavesurfer.drawer.container = container;

  wavesurfer.drawer.height = height;
  wavesurfer.drawer.params.height = height;
  // debugger
  // if ($(child).css('height') == '128px')) {
  //
  // }
  // var $grand = $($children.children());
  // if ($($grand[0]).attr('width') != '815') {
  //   $($grand[0]).attr('width', '815');
  //   $($grand[0]).attr('height', '128');
  //   $($grand[0]).css('width', '815px');
  //   $($grand[0]).css('height', '128px');
  //   var $greatgrand = $($($grand[1]).children()[0]);
  //   $($($($grand[1]).children()[0])).attr('width', '815');
  //   $($($($grand[1]).children()[0])).attr('height', '128');
  //   $($($($grand[1]).children()[0])).css('width', '815px');
  //   $($($($grand[1]).children()[0])).css('height', '128px');
  // }

  wavesurfer.drawBuffer();

  _songs[songId] = WSObject;
};

CurrentPlayingSongStore.getCurrentPlayingId = function () {
  if (_currentSong) {
    return _currentSong.id;
  }
};

CurrentPlayingSongStore.hasNext = function () {
  if (_queuedSongsIdArray.length === 0) {
    return false;
  } else {
    return true;
  }
};

CurrentPlayingSongStore.hasPrev = function () {
  if (_pastSongsIdArray.length === 0) {
    return false;
  } else {
    return true;
  }
};

CurrentPlayingSongStore.getSong = function (songId) {
  if (songId) {
    return _songs[songId];
  } else {
    return _currentSong;
  }
};

CurrentPlayingSongStore.hasSong = function (songId) {
  if (_songs[songId]) {
    return true;
  } else {
    return false;
  }
};

CurrentPlayingSongStore.resetSong = function (WSObject) {
  if (_currentSong.id == WSObject.id) {
    _currentSong = WSObject;
  }
  _songs[WSObject.id] = WSObject;
};

CurrentPlayingSongStore.getCurrentTime = function (songId) {
  if (!songId) {
    // if (_currentSong.wavesurfer.isPlaying()) {
      return _currentSong.wavesurfer.getCurrentTime();
    // } else {
    //   return _currentTime;
    // }
  } else {
    return _songs[songId].wavesurfer.getCurrentTime();
  }
};

CurrentPlayingSongStore.getDuration = function () {
  if (_currentSong) {
    return _currentSong.wavesurfer.getDuration();
  }
};

CurrentPlayingSongStore.isPlaying = function (songId) {
  if (songId) {
    // SPECIFIC SONG QUERY
    if (_currentSong && _currentSong.id === songId) {
      return _currentSong.wavesurfer.isPlaying();
    } else {
      return false;
    }
  } else {
    // GENERIC SONG QUERY
    if (_currentSong) {
      return _currentSong.wavesurfer.isPlaying();
    } else {
      return false;
    }
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
      addSong(payload.WSObject);
      CurrentPlayingSongStore.__emitChange();
      break;
    case PlayingSongConstants.NEW_PLAYLIST:
      addSongs(payload.WSPlaylist);
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
      playPause(payload.songId);
      CurrentPlayingSongStore.__emitChange();
      break;
  }
};

module.exports = CurrentPlayingSongStore;
