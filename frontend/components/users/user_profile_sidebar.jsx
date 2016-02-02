var React = require('react');
var UserStore = require('../../stores/user_store');
var ApiUtil = require('../../util/api_util');
var UserInfo = require('./user_info');
var UserLikesSnapshot = require('./user_likes_snapshot');
var UserFollowsSnapshot = require('./user_follows_snapshot');

var UserProfileSidebar = React.createClass({

  render: function () {

    return (
      <div className="profile-sidebar group">
        <UserInfo user={this.props.user} />
        <UserLikesSnapshot user={this.props.user} />
        <UserFollowsSnapshot user={this.props.user} />
      </div>
    );
  }
});

module.exports = UserProfileSidebar;
