var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants'),
    LikeConstants = require('../constants/like_constants');

var UserStore = new Store(Dispatcher);

var _user = {};
var _songs = {};
var _likedSongs = {};

var resetUser = function(user) {
  _user = user;
};

var resetUserSongs = function(songs) {
  _songs = {};
  songs.forEach(function(song) {
    _songs[song.id] = song;
  });
};

var resetUserLikedSongs = function(songs) {
  _likedSongs = {};
  songs.forEach(function(song) {
    _likedSongs[song.id] = song;
  });
};

var updateLikedSong = function(song) {
  if (song.user_id == _user.id) {
    // if (typeof _songs[song.id] != 'undefined') {
      _songs[song.id] = song;
    // }
    _likedSongs[song.id] = song;

  } else if (_likedSongs[song.id]) {
    _likedSongs[song.id] = song;
  }
};

var updateUnlikedSong = function(like) {
  // if (like.user_id == _user.id) {
  //   delete _likedSongs[like.song_id];
  // }
  if (_likedSongs[like.song_id]) {
    delete _likedSongs[like.song_id];
  }
  // DECREMENTED BY 2
  if (_songs[like.song_id]) {
    _songs[like.song_id].num_likes -= 1;
  }
};

UserStore.isCurrentUser = function(userId) {
  return userId === _currentUser.id;
};

UserStore.getCurrentUser = function () {
  return _currentUser;
};

UserStore.resetCurrentUser = function (user) {
  _currentUser = user;
};

UserStore.removeCurrentUser = function () {
  _currentUser = null;
};

UserStore.getUser = function () {
  return _user;
};

UserStore.all = function () {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UserStore.find = function(id) {
  return _users[id];
};

UserStore.getUserSongs = function() {
  var songs = [];
  for (var id in _songs) {
    songs.push(_songs[id]);
  }
  return songs;
};

UserStore.getUserLikedSongs = function () {
  var likedSongs = [];
  for (var id in _likedSongs) {
    likedSongs.push(_likedSongs[id]);
  }
  return likedSongs;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case UserConstants.CURRENT_USER_RECEIVED:
      // resetCurrentUser(payload.user);
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.USER_RECEIVED:
      // addUser(payload.user);
      resetUser(payload.user);
      resetUserSongs(payload.user.songs);
      resetUserLikedSongs(payload.user.liked_songs);
      UserStore.__emitChange();
      break;
    case LikeConstants.LIKE_RECEIVED:
      if (Object.keys(_user).length > 0) {
        updateLikedSong(payload.likedSong);
        UserStore.__emitChange();
      }
      break;
    case LikeConstants.UNLIKE_RECEIVED:
      if (Object.keys(_user).length > 0) {
        updateUnlikedSong(payload.like);
        UserStore.__emitChange();
      }
      break;
  }
};



module.exports = UserStore;
