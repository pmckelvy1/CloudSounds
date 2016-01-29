var FollowConstants = require('../constants/follow_constants'),
    Dispatcher = require('../dispatcher/dispatcher');

var FollowActions = {
  receiveFollow: function(followedUser) {
    Dispatcher.dispatch({
      actionType: FollowConstants.USER_FOLLOWED,
      followedUser: followedUser
    });
  },

  receiveUnFollow: function(follow) {
    Dispatcher.dispatch({
      actionType: FollowConstants.USER_UNFOLLOWED,
      follow: follow
    });
  },

  receiveCurrentUserFollows: function(follows) {
    Dispatcher.dispatch({
      actionType: FollowConstants.RECEIVE_CURRENT_USER_FOLLOWS,
      follows: follows
    });
  }
};

module.exports = FollowActions;
