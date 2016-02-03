var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants'),
    LikeConstants = require('../constants/like_constants'),
    FollowConstants = require('../constants/follow_constants'),
    CurrentUserStore = require('../stores/current_user_store'),
    SongConstants = require('../constants/song_constants'),
    PlaylistConstants = require('../constants/playlist_constants');

var UserStore = new Store(Dispatcher);

var _user = {};
var _songs = {};
var _likedSongs = {};
var _followedSongs = {};
var _followedUsers = {};
var _playlists = {};

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

var resetPlaylists = function(playlists) {
  _playlists = {};
  playlists.forEach(function(playlist) {
    _playlists[playlist.id] = playlist;
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

var updateNumPlays = function (playData) {
  if (_likedSongs[playData.id]) {
    _likedSongs[playData.id].num_plays = playData.num_plays;
  }
  if (_followedSongs[playData.id]) {
    _followedSongs[playData.id].num_plays = playData.num_plays;
  }
  if (_songs[playData.id]) {
    _songs[playData.id].num_plays = playData.num_plays;
  }
};

var addSongToPlaylist = function (addedSongData) {
  _playlists[addedSongData.playlist_id].songs.push(addedSongData);
};

UserStore.getUser = function () {
  return _user;
};

UserStore.userId = function () {
  return _user.id;
};

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

UserStore.getPlaylists = function () {
  var playlists = [];
  for (var id in _playlists) {
    playlists.push(_playlists[id]);
  }
  return playlists;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.CURRENT_USER_RECEIVED:
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.USER_RECEIVED:
      resetUser(payload.user);
      resetUserSongs(payload.user.songs);
      resetUserLikedSongs(payload.user.liked_songs);
      resetUserFollowedSongs(payload.user.followed_songs);
      resetFollowedUsers(payload.user.followed_users);
      resetPlaylists(payload.user.playlists);
      UserStore.__emitChange();
      break;
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
    case SongConstants.NUM_PLAYS_RECEIVED:
      updateNumPlays(payload.playData);
      UserStore.__emitChange();
      break;
    case PlaylistConstants.ADD_SONG_TO_PLAYLIST:
      addSongToPlaylist(payload.addedSongData);
      UserStore.__emitChange();
      break;
  }
};



module.exports = UserStore;
