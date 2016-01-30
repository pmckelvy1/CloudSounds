var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var CurrentUserActions = {
  receiveCurrentUser: function (currentUser) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  },
  userLogOut: function () {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.USER_LOG_OUT,
    });
  }
};

module.exports = CurrentUserActions;
