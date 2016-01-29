var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');
var FollowConstants = require('../constants/follow_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;
var CurrentUserStore = new Store(Dispatcher);

var _followedUsers = {};

var resetFollowedUsers = function(followedUsers) {
  _followedUsers = {};
  followedUsers.forEach(function (followedUser) {
    _followedUsers[followedUser.id] = followedUser;
  });
};

var removeFollow = function (follow) {
  delete _followedUsers[follow.followed_id];
};

var addFollow = function (followedUser) {
  _followedUsers[followedUser.id] = followedUser;
};

CurrentUserStore.doesFollow = function(followedId) {
  if (_followedUsers[followedId]) {
    return true;
  } else {
    return false;
  }
};

CurrentUserStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.currentUserId = function () {
  return _currentUser.id;
};

CurrentUserStore.doesFollow = function (userId) {
  if (_followedUsers[userId]) {
    return true;
  } else {
    return false;
  }
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      _currentUserHasBeenFetched = true;
      _currentUser = payload.currentUser;
      resetFollowedUsers(payload.currentUser.followed_users);
      CurrentUserStore.__emitChange();
      break;
    case FollowConstants.USER_FOLLOWED:
      addFollow(payload.followedUser);
      CurrentUserStore.__emitChange();
      break;
    case FollowConstants.USER_UNFOLLOWED:
      removeFollow(payload.follow);
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
