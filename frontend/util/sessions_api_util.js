var CurrentUserActions = require("./../actions/current_user_actions");
var UserActions = require('../actions/user_actions');
var CurrentUserStore = require('../stores/current_user_store');

var SessionsApiUtil = {
  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        UserActions.receiveSingleUser(currentUser);
        success && success();
      }
    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      method: 'DELETE',
      dataType: 'json',
      success: function () {
        CurrentUserActions.userLogOut();
        callback && callback();
      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        if (Object.keys(currentUser).length != 0) {
          CurrentUserActions.receiveCurrentUser(currentUser);
        }
        cb && cb(currentUser);
      }
    });
  },

  createNewUser: function (userData, success) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'JSON',
      data: userData,
      processData: false,
      contentType: false,
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        UserActions.receiveSingleUser(user);
        success && success();
      }
    });
  }
};

module.exports = SessionsApiUtil;
