var FollowConstants = require('../constants/follow_constants'),
    Dispatcher = require('../dispatcher/dispatcher');

var FollowActions = {
  receiveFollow: function(follow) {
    Dispatcher.dispatch({
      actionType: FollowConstants.USER_FOLLOWED,
      follow: follow
    });
  },

  receiveUnFollow: function(follow) {
    Dispatcher.dispatch({
      actionType: FollowConstants.USER_UNFOLLOWED,
      follow: follow
    });
  }
};

module.exports = FollowActions;
