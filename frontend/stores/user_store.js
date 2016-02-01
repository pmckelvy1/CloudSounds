var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants'),
    LikeConstants = require('../constants/like_constants'),
    FollowConstants = require('../constants/follow_constants'),
    CurrentUserStore = require('../stores/current_user_store');

var UserStore = new Store(Dispatcher);

var _user = {};
var _songs = {};
var _likedSongs = {};
var _followedSongs = {};
var _followedUsers = {};

var resetUser = function(user) {
  _user = user;
};

var resetUserSongs = function(songs) {
  _songs = {};
  songs.forEach(function(song) {
    _songs[song.id] = song;
  });
};

var resetUserLikedSongs = function(songs) {
  _likedSongs = {};
  songs.forEach(function(song) {
    _likedSongs[song.id] = song;
  });
};

var resetUserFollowedSongs = function(songs) {
  _followedSongs = {};
  songs.forEach(function(song) {
    _followedSongs[song.id] = song;
  });
};

var resetFollowedUsers = function(users) {
  _followedUsers = {};
  users.forEach(function(user) {
    _followedUsers[user.id] = user;
  });
};

var updateLikedSong = function(song) {
  if (song.user_id == _user.id) {
    _songs[song.id] = song;
    if (_likedSongs[song.id]) {
      _likedSongs[song.id] = song;
    }
  } else if (_likedSongs[song.id]) {
    _likedSongs[song.id] = song;
  }
  if (_user.id === CurrentUserStore.currentUserId()) {
    _likedSongs[song.id] = song;
  }
};

var updateUnlikedSong = function(unLikedSong) {
  // if (like.user_id == _user.id) {
  //   delete _likedSongs[like.song_id];
  // }
  if (_likedSongs[unLikedSong.id]) {
    delete _likedSongs[unLikedSong.id];
  }
  // DECREMENTED BY 2
  if (_songs[unLikedSong.id]) {
    _songs[unLikedSong.id] = unLikedSong;
  }
};

// UserStore.isCurrentUser = function(userId) {
//   return userId === _currentUser.id;
// };
//
// UserStore.getCurrentUser = function () {
//   return _currentUser;
// };
//
// UserStore.resetCurrentUser = function (user) {
//   _currentUser = user;
// };
//
// UserStore.removeCurrentUser = function () {
//   _currentUser = null;
// };

UserStore.getUser = function () {
  return _user;
};

UserStore.userId = function () {
  return _user.id;
};

// UserStore.all = function () {
//   var users = [];
//   for (var id in _users) {
//     users.push(_users[id]);
//   }
//   return users;
// };
//
// UserStore.find = function(id) {
//   return _users[id];
// };

UserStore.getUserSongs = function() {
  var songs = [];
  for (var id in _songs) {
    songs.push(_songs[id]);
  }
  return songs;
};

UserStore.doesLikeSong = function(songId) {
  if (_likedSongs[songId]) {
    return true;
  } else {
    return false;
  }
};

UserStore.getUserLikedSongs = function () {
  var likedSongs = [];
  for (var id in _likedSongs) {
    likedSongs.push(_likedSongs[id]);
  }
  return likedSongs;
};

UserStore.getUserFollowedSongs = function () {
  var followedSongs = [];
  for (var id in _followedSongs) {
    followedSongs.push(_followedSongs[id]);
  }
  return followedSongs;
};

UserStore.getFollowedUsers = function () {
  var followedUsers = [];
  for (var id in _followedUsers) {
    followedUsers.push(_followedUsers[id]);
  }
  return followedUsers;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    // case UserConstants.USERS_RECEIVED:
    //   resetUsers(payload.users);
    //   UserStore.__emitChange();
    //   break;
    case UserConstants.CURRENT_USER_RECEIVED:
      // resetCurrentUser(payload.user);
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.USER_RECEIVED:
      // addUser(payload.user);
      resetUser(payload.user);
      resetUserSongs(payload.user.songs);
      resetUserLikedSongs(payload.user.liked_songs);
      resetUserFollowedSongs(payload.user.followed_songs);
      resetFollowedUsers(payload.user.followed_users);
      UserStore.__emitChange();
      break;
    // case LikeConstants.LIKE_RECEIVED:
    //   if (Object.keys(_user).length > 0) {
    //     updateLikedSong(payload.likedSong);
    //     // UserStore.__emitChange();
    //   }
    //   break;
    // case LikeConstants.UNLIKE_RECEIVED:
    //   if (Object.keys(_user).length > 0) {
    //     updateUnlikedSong(payload.unLikedSong);
    //     // UserStore.__emitChange();
    //   }
      // break;
    case FollowConstants.USER_FOLLOWED:
      if (_user.id == payload.followedUser.id) {
        _user.num_followers += 1;
        UserStore.__emitChange();
      }
      break;
    case FollowConstants.USER_UNFOLLOWED:
      if (_user.id == payload.follow.followed_id) {
        _user.num_followers -= 1;
        UserStore.__emitChange();
      }
      if (_user.id == payload.follow.user_id) {
        delete _followedUsers[payload.follow.followed_id];
        _user.num_followed_users -= 1;
        UserStore.__emitChange();
      }
      break;
  }
};



module.exports = UserStore;
