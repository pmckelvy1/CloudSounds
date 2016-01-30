var UserActions = require('../actions/user_actions');
var FollowActions = require('../actions/follow_actions');
var SongActions = require('../actions/song_actions');
var LikeActions = require('../actions/like_actions');
var CommentActions = require('../actions/comment_actions');

var ApiUtil = {

  fetchUsers: function () {
    $.ajax({
      type: 'GET',
      url: '/api/users',
      dataType: 'JSON',
      success: function (users) {
        UserActions.receiveUsers(users);
      }
    });
  },

  fetchSingleUser: function (userId) {
    $.ajax({
      type: 'GET',
      url: '/api/users/' + userId,
      dataType: 'JSON',
      success: function (user) {
        UserActions.receiveSingleUser(user);
        // SongActions.receiveUserSongs(user.songs);
        // LikeActions.receiveLikes(user.likes);
      }
    });
  },

  signIn: function (userInfo) {
    $.ajax({
      type: 'POST',
      url: '/session',
      dataType: 'JSON',
      data: { user: userInfo },
      success: function (user) {
        UserActions.receiveUser(user);
        // FollowActions.receiveCurrentUserFollows(user.follows);
      }
    });
  },

  unFollow: function (followedId) {
    $.ajax({
      type: 'POST',
      method: 'DELETE',
      url: '/api/follows/' + followedId,
      dataType: 'JSON',
      success: function (followData) {
        FollowActions.receiveUnFollow(followData);
      }
    });
  },

  follow: function (followedId) {
    $.ajax({
      type: 'POST',
      url: '/api/follows',
      dataType: 'JSON',
      data: { followed_id: followedId },
      success: function (followedUser) {
        FollowActions.receiveFollow(followedUser);
      }
    });
  },

  // GET THE SONGS THAT BELONG TO A SPECIFIC USER
  getUserSongs: function(userId) {
    $.ajax({
      type: 'GET',
      url: '/api/songs',
      dataType: 'JSON',
      data: { user_id: userId },
      success: function (songs) {
        SongActions.receiveUserSongs(songs);
      }
    });
  },

  // GET ALL OF THE SONGS OF ALL OF THE ARTISTS THAT THE
  // CURRENT USER FOLLOWS, ORDER BY MOST RECENT, MAX 20 AT A TIME
  fetchAllSongs: function() {
    $.ajax({
      type: 'GET',
      url: '/api/songs',
      dataType: 'JSON',
      success: function (songs) {
        SongActions.receiveAllSongs(songs);
      }
    });
  },

  like: function(songId) {
    $.ajax({
      type: 'POST',
      url: '/api/likes',
      dataType: 'JSON',
      data: { song_id: songId },
      success: function (likedSong) {
        LikeActions.receiveLike(likedSong);
      }
    });
  },

  unLike: function(songId) {
    $.ajax({
      type: 'POST',
      method: 'DELETE',
      url: '/api/likes/' + songId,
      dataType: 'JSON',
      success: function (likeData) {
        LikeActions.receiveUnLike(likeData);
      }
    });
  },

  createSong: function(songData, callback) {
    // UPLOAD SONG
    $.ajax({
      type: 'POST',
      url: '/api/songs/',
      dataType: 'JSON',
      processData: false,
      contentType: false,
      data: songData,
      success: function (data) {
        callback && callback();
      }
    });
  },

  fetchSingleSong: function(songId) {
    $.ajax({
      type: 'GET',
      url: '/api/songs/' + songId,
      dataType: 'JSON',
      success: function (song) {
        debugger
        SongActions.receiveSingleSong(song);
      }
    });
  },

  createComment: function(comment, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/songs/',
      dataType: 'JSON',
      processData: false,
      contentType: false,
      data: { comment: comment },
      success: function (commentData) {
        CommentActions.receiveComment(commentData);
        callback && callback();
      }
    });
  }

};

module.exports = ApiUtil;
