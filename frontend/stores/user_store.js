var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

var UserStore = new Store(Dispatcher);


var _users = {};

// var _currentUser = null;
//
// var resetCurrentUser = function (user) {
//   _currentUser = user;
// };

var resetUsers = function(users) {
  _users = {};
  users.forEach(function (user) {
    _users[user.id] = user;
  });
};

var addUser = function(user) {
  _users[user.id] = user;
};

UserStore.isCurrentUser = function(userId) {
  return userId === _currentUser.id;
};

UserStore.getCurrentUser = function () {
  return _currentUser;
};

UserStore.resetCurrentUser = function (user) {
  _currentUser = user;
};

UserStore.removeCurrentUser = function () {
  _currentUser = null;
};

UserStore.all = function () {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UserStore.find = function(id) {
  return _users[id];
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case UserConstants.CURRENT_USER_RECEIVED:
      resetCurrentUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.USER_RECEIVED:
      addUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};



module.exports = UserStore;
