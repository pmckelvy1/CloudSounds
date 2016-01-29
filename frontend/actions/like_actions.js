var LikeConstants = require('../constants/like_constants'),
    Dispatcher = require('../dispatcher/dispatcher');

var LikeActions = {
  receiveLikes: function(likes) {
    Dispatcher.dispatch({
      actionType: LikeConstants.LIKES_RECEIVED,
      likes: likes
    });
  },

  receiveLike: function(likedSong) {
    Dispatcher.dispatch({
      actionType: LikeConstants.LIKE_RECEIVED,
      likedSong: likedSong
    });
  },

  receiveUnLike: function(like) {
    Dispatcher.dispatch({
      actionType: LikeConstants.UNLIKE_RECEIVED,
      like: like
    });
  }
};


module.exports = LikeActions;
