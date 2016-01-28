var UserActions = require('../actions/user_actions');
var FollowActions = require('../actions/follow_actions');
var SongActions = require('../actions/song_actions');
var LikeActions = require('../actions/like_actions');

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
        SongActions.receiveUserSongs(user.songs);
        LikeActions.receiveLikes(user.likes);
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

  unFollow: function (follow) {
    $.ajax({
      type: 'POST',
      method: 'DELETE',
      url: '/api/follows/' + follow.id,
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
      success: function (follow) {
        FollowActions.receiveFollow(follow);
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
      success: function (like) {
        LikeActions.receiveLike(like);
      }
    });
  },

  unLike: function(like) {
    $.ajax({
      type: 'POST',
      method: 'DELETE',
      url: '/api/likes/' + like.id,
      dataType: 'JSON',
      success: function (likeData) {
        LikeActions.receiveUnLike(likeData);
      }
    });
  }

};

module.exports = ApiUtil;
