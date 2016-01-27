var UserConstants = require('../constants/user_constants'),
    Dispatcher = require('../dispatcher/dispatcher'),
    ApiUtil = require('../util/api_util');

var UserActions = {
  receiveUsers: function(users) {
    Dispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },

  receiveCurrentUser: function(user) {
    Dispatcher.dispatch({
      actionType: UserConstants.CURRENT_USER_RECEIVED,
      user: user
    });
  }
};

module.exports = UserActions;
