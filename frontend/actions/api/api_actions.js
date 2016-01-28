var ApiUtil = require('../../util/api_util');

var ApiActions = {
  follow: function(followedId) {
    ApiUtil.follow(followedId);
  },

  unFollow: function(follow) {
    ApiUtil.unFollow(follow);
  },

  like: function(songId) {
    ApiUtil.like(songId);
  },

  unLike: function(like) {
    ApiUtil.unLike(like);
  }
};

module.exports = ApiActions;
