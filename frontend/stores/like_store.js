var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    LikeConstants = require('../constants/like_constants'),
    CurrentUserConstants = require('../constants/current_user_constants');

var LikeStore = new Store(Dispatcher);

var _likes = {};

var resetLikes = function (likes) {
  _likes = {};
  likes.forEach(function (like) {
    _likes[like.song_id] = like;
  });
};

var addLike = function (like) {
  _likes[like.song_id] = like;
};

var removeLike = function (like) {
  delete _likes[like.song_id];
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
  // switch (payload.actionType) {
  //   case LikeConstants.LIKE_RECEIVED:
  //     addLike(payload.like);
  //     LikeStore.__emitChange();
  //     break;
  //   case LikeConstants.UNLIKE_RECEIVED:
  //     removeLike(payload.like);
  //     LikeStore.__emitChange();
  //     break;
  //   case LikeConstants.LIKES_RECEIVED:
  //     resetLikes(payload.likes);
  //     LikeStore.__emitChange();
  //     break;
  //   case CurrentUserConstants.RECEIVE_CURRENT_USER:
  //     resetLikes(payload.currentUser.likes);
  //     LikeStore.__emitChange();
  //     break;
  // }
};

module.exports = LikeStore;
