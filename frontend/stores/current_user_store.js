var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');
var FollowConstants = require('../constants/follow_constants');
var LikeConstants = require('../constants/like_constants');
var SongConstants = require('../constants/song_constants');
var PlaylistConstants = require('../constants/playlist_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;
var CurrentUserStore = new Store(Dispatcher);

var _followedUsers = {};
var _likedSongs = {};
var _followedSongs = {};
var _playlists = {};

var resetFollowedUsers = function(followedUsers) {
  _followedUsers = {};
  followedUsers.forEach(function (followedUser) {
    _followedUsers[followedUser.id] = followedUser;
  });
};

var resetLikedSongs = function(likedSongs) {
  _likedSongs = {};
  likedSongs.forEach(function(likedSong) {
    _likedSongs[likedSong.id] = likedSong;
  });
};

var resetFollowedSongs = function(followedSongs) {
  _followedSongs = {};
  followedSongs.forEach(function(followedSong) {
    _followedSongs[followedSong.id] = followedSong;
  });
};

var resetPlaylists = function(playlists) {
  _playlists = {};
  playlists.forEach(function(playlist) {
    _playlists[playlist.id] = playlist;
  });
};

var removeFollow = function (follow) {
  delete _followedUsers[follow.followed_id];
  for (var id in _followedSongs) {
    if (_followedSongs[id].user_id === follow.followed_id) {
      delete _followedSongs[id];
    }
  }
};

var addFollow = function (followedUser) {
  _followedUsers[followedUser.id] = followedUser;
  followedUser.songs.forEach(function(song) {
    _followedSongs[song.id] = song;
  });
};

var removeLike = function (unLikedSong) {
  delete _likedSongs[unLikedSong.id];
  if (_followedSongs[unLikedSong.id]) {
    _followedSongs[unLikedSong.id] = unLikedSong;
  }
};

var addLike = function (likedSong) {
  _likedSongs[likedSong.id] = likedSong;
  if (_followedSongs[likedSong.id]) {
    _followedSongs[likedSong.id] = likedSong;
  }
};

var updateNumPlays = function (playData) {
  if (_likedSongs[playData.id]) {
    _likedSongs[playData.id].num_plays = playData.num_plays;
  }
  if (_followedSongs[playData.id]) {
    _followedSongs[playData.id].num_plays = playData.num_plays;
  }
};

var addSongToPlaylist = function (addedSongData) {
  _playlists[addedSongData.playlist_id].songs.push(addedSongData);
};

var addNewPlaylist = function (newPlaylist) {
  _playlists[newPlaylist.id] = newPlaylist;
};

CurrentUserStore.doesFollow = function(followedId) {
  if (_followedUsers[followedId]) {
    return true;
  } else {
    return false;
  }
};

CurrentUserStore.getUserSongs = function () {
  return _currentUser.songs;
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

CurrentUserStore.doesLike = function (songId) {
  if (_likedSongs[songId]) {
    return true;
  } else {
    return false;
  }
};

CurrentUserStore.likedSongs = function () {
  var likedSongs = [];
  for (var id in _likedSongs) {
    likedSongs.push(_likedSongs[id]);
  }
  return likedSongs;
};

CurrentUserStore.followedSongs = function () {
  var followedSongs = [];
  for (var id in _followedSongs) {
    followedSongs.push(_followedSongs[id]);
  }
  return followedSongs;
};

CurrentUserStore.playlists = function () {
  var playlists = [];
  for (var id in _playlists) {
    playlists.push(_playlists[id]);
  }
  return playlists;
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.getCurrentUserProfilePic = function () {
  return _currentUser.image_url;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      _currentUserHasBeenFetched = true;
      _currentUser = payload.currentUser;
      resetFollowedUsers(payload.currentUser.followed_users);
      resetLikedSongs(payload.currentUser.liked_songs);
      resetFollowedSongs(payload.currentUser.followed_songs);
      resetPlaylists(payload.currentUser.playlists);
      CurrentUserStore.__emitChange();
      break;
    case CurrentUserConstants.USER_LOG_OUT:
      _currentUser = {};
      _followedUsers = {};
      _likedSongs = {};
      _followedSongs = {};
      _currentUserHasBeenFetched = false;
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
    case LikeConstants.UNLIKE_RECEIVED:
      removeLike(payload.unLikedSong);
      CurrentUserStore.__emitChange();
      break;
    case LikeConstants.LIKE_RECEIVED:
      addLike(payload.likedSong);
      CurrentUserStore.__emitChange();
      break;
    case SongConstants.NUM_PLAYS_RECEIVED:
      updateNumPlays(payload.playData);
      CurrentUserStore.__emitChange();
      break;
    case PlaylistConstants.ADD_SONG_TO_PLAYLIST:
      addSongToPlaylist(payload.addedSongData);
      CurrentUserStore.__emitChange();
      break;
    case PlaylistConstants.ADD_NEW_PLAYLIST:
      addNewPlaylist(payload.newPlaylist);
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
