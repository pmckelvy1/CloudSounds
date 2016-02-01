var React = require('react');
var UserStore = require('../../stores/user_store');
var TrackUserMini = require('../audio/track_user_mini');

var UserFollowsSnapshot = React.createClass({
  getInitialState: function () {
    return { followedUsers: UserStore.getFollowedUsers() };
  },

  render: function () {
    // return (
    //   <div className="user-likes-snapshot">
    //     <h1>309 Following</h1>
    //     <ul>
    //       <li className="test-page-text-smaller">USER 1</li>
    //       <li className="test-page-text-smaller">USER 2</li>
    //       <li className="test-page-text-smaller">USER 3</li>
    //     </ul>
    //   </div>
    // );
    var followed_users = this.state.followedUsers;
    var numFollowedUsers = followed_users.length;
    var followedUsers = [];
    for (var i = 0; i < 3 && i < followed_users.length; i++) {
      followedUsers.push(<li key={i} ><TrackUserMini user={followed_users[i]} /></li>);
    }
    return (
      <div className="user-likes-snapshot">
        <div className="snapshot-header">
          <h1><i className="fa fa-users"></i> {numFollowedUsers} following</h1>
        </div>
        <ul className="group">
          {followedUsers}
        </ul>
      </div>
    );
  }
});

module.exports = UserFollowsSnapshot;
