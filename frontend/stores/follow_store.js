var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    FollowConstants = require('../constants/follow_constants');

var FollowStore = new Store(Dispatcher);

var _follows = {};

var resetFollows = function(follows) {
  _follows = {};
  follows.forEach(function (follow) {
    _follows[follow.followed_id] = follow;
  });
};

FollowStore.removeFollow = function (follow) {
  delete _follows[follow.followed_id];
};

FollowStore.addFollow = function (follow) {
  _follows[follow.followed_id] = follow;
};

// FollowStore.all = function () {
//   var follows = [];
//   for (var followedId in _follows) {
//     follows.push(_follows[followedId]);
//   }
//   return follows;
// };

FollowStore.find = function(followedId) {
  return _follows[followedId];
};

FollowStore.doesFollow = function(followedId) {
  if (_follows[followedId]) {
    return true;
  } else {
    return false;
  }
};

FollowStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case FollowConstants.USER_FOLLOWED:
      FollowStore.addFollow(payload.follow);
      FollowStore.__emitChange();
      break;
    case FollowConstants.USER_UNFOLLOWED:
      FollowStore.removeFollow(payload.follow);
      FollowStore.__emitChange();
      break;
  }
};

module.exports = FollowStore;
