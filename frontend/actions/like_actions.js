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

  receiveUnLike: function(unLikedSong) {
    Dispatcher.dispatch({
      actionType: LikeConstants.UNLIKE_RECEIVED,
      unLikedSong: unLikedSong
    });
  }
};


module.exports = LikeActions;
