var UserActions = require('../actions/user_actions');
var FollowActions = require('../actions/follow_actions');

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
  }

};

module.exports = ApiUtil;
