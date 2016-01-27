var UserActions = require('../actions/user_actions');
var FollowActions = require('../actions/follow_actions');
var SongActions = require('../actions/song_actions');

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
  }

};

module.exports = ApiUtil;
