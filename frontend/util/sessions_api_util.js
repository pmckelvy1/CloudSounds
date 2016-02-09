var CurrentUserActions = require("./../actions/current_user_actions");
var UserActions = require('../actions/user_actions');
var CurrentUserStore = require('../stores/current_user_store');
var LikeActions = require('../actions/like_actions');

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
        LikeActions.receiveLikes(currentUser.followed_songs);
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
          LikeActions.receiveLikes(currentUser.followed_songs);
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
  },

  updateUser: function (userData, userId, success) {
    $.ajax({
      url: '/api/users/' + userId,
      type: 'POST',
      method: 'PATCH',
      dataType: 'JSON',
      data: userData,
      processData: false,
      contentType: false,
      success: function (user) {
        success && success();
        CurrentUserActions.receiveCurrentUser(user);
        UserActions.receiveSingleUser(user);
      }
    });
  }

};

module.exports = SessionsApiUtil;
