var React = require('react'),
    UserStore = require('../../stores/user_store'),
    UserInfo = require('./user_info'),
    UserProfileNav = require('./user_profile_nav'),
    UserProfileHeader = require('./user_profile_header'),
    UserProfileNavOptions = require('./user_profile_nav_options'),
    UserLikesSnapshot = require('./user_likes_snapshot'),
    UserFollowsSnapshot = require('./user_follows_snapshot'),
    ApiUtil = require('../../util/api_util');

var UserProfile = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { user: UserStore.find(userId) };
  },

  componentDidMount: function () {
    var us = UserStore.addListener(function () {
      this.setState({ user: UserStore.find(this.props.params.id) });
    }.bind(this));
    this.setState({ usToken: us });
    ApiUtil.fetchSingleUser(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.state.usToken.remove();
  },

  render: function () {
    return (
      <div>
        <UserProfileHeader userId={this.props.params.id} />
        <UserProfileNav userId={this.props.params.id} />
        <UserProfileNavOptions userId={this.props.params.id} />
        <div className="profile-main group">
          <div className="profile-sidebar group">
            <div className="test-page-text">USER PROFILE</div>
            <div className="test-page-text">{this.state.user.username}</div>
            <UserInfo userInfo={this.state.user.info} />
            <UserLikesSnapshot userId={this.props.params.id} />
            <UserFollowsSnapshot userId={this.props.params.id} />
          </div>

          <div className="profile-content group">
            {this.props.children}
          </div>
        </div>
      </div>

    );
  }

});

module.exports = UserProfile;
