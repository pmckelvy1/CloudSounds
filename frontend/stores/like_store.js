var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    LikeConstants = require('../constants/like_constants'),
    CurrentUserConstants = require('../constants/current_user_constants'),
    CurrentUserStore = require('./current_user_store'),
    UserStore = require('./user_store');

var LikeStore = new Store(Dispatcher);

var _likes = {};
var _likedSongs = {};

var resetLikes = function (songs) {
  _likes = {};
  _likedSongs = {};
  songs.forEach(function (song) {
    if (UserStore.doesLikeSong(song.id)){
      _likedSongs[song.id] = song;
    }
    _likes[song.id] = song.num_likes;
  });
};

var addLike = function (likedSong) {
  if (_likes[likedSong.id]) {
    _likes[likedSong.id] += 1;
  } else {
    _likes[likedSong.id] = 1;
  }
  if (_likedSongs[likedSong.id] || CurrentUserStore.currentUserId() == UserStore.userId()) {
    _likedSongs[likedSong.id] = likedSong;
  }
};

var removeLike = function (unLikedSong) {
  if (_likes[unLikedSong.id]) {
    _likes[unLikedSong.id] -= 1;
  }
  if (CurrentUserStore.currentUserId() == UserStore.userId()) {
    delete _likedSongs[unLikedSong.id];
  } else if (_likedSongs[unLikedSong.id]) {
    _likedSongs[unLikedSong.id] = unLikedSong;
  }
};

LikeStore.getNumLikes = function(songId) {
  if (_likes[songId]) {
    return _likes[songId];
  } else {
    return 0;
  }
};

LikeStore.getLikedSongs = function () {
  likedSongs = [];
  for (var id in _likedSongs) {
    likedSongs.push(_likedSongs[id]);
  }
  return likedSongs;
};

LikeStore.all = function () {
  var likes = [];
  for (var songId in _likes) {
    likes.push(_likes[songId]);
  }
  return likes;
};

LikeStore.find = function(likedId) {
  return _likes[likedId];
};

LikeStore.doesLike = function(likedId) {
  if (_likes[likedId]) {
    return true;
  } else {
    return false;
  }
};

LikeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case LikeConstants.LIKE_RECEIVED:
      addLike(payload.likedSong);
      LikeStore.__emitChange();
      break;
    case LikeConstants.UNLIKE_RECEIVED:
      removeLike(payload.unLikedSong);
      LikeStore.__emitChange();
      break;
    case LikeConstants.LIKES_RECEIVED:
      resetLikes(payload.songs);
      LikeStore.__emitChange();
      break;
    // case CurrentUserConstants.RECEIVE_CURRENT_USER:
    // debugger
    //   resetLikes(payload.currentUser.likes);
    //   LikeStore.__emitChange();
    //   break;
  }
};

module.exports = LikeStore;
