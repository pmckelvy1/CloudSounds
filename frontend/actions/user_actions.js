var UserConstants = require('../constants/user_constants'),
    Dispatcher = require('../dispatcher/dispatcher');

var UserActions = {

  receiveUsers: function(users) {
    Dispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  }

};

module.exports = UserActions;
