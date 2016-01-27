var ApiUtil = require('../../util/api_util');

var ApiActions = {
  unFollow: function(follow) {
    ApiUtil.unFollow(follow);
  },

  follow: function(followedId) {
    ApiUtil.follow(followedId);
  }
};

module.exports = ApiActions;
