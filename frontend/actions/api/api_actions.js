var ApiUtil = require('../../util/api_util');

var ApiActions = {
  follow: function(followedId) {
    ApiUtil.follow(followedId);
  },

  unFollow: function(followedId) {
    ApiUtil.unFollow(followedId);
  },

  like: function(songId) {
    ApiUtil.like(songId);
  },

  unLike: function(like) {
    ApiUtil.unLike(like);
  }
};

module.exports = ApiActions;
