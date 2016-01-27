var React = require('react'),
    UserStore = require('../../stores/user_store'),
    UserInfo = require('./user_info'),
    UserProfileNav = require('./user_profile_nav'),
    UserProfileHeader = require('./user_profile_header'),
    UserProfileNavOptions = require('./user_profile_nav_options'),
    UserLikesSnapshot = require('./user_likes_snapshot');

var UserProfile = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { user: UserStore.find(userId) };
  },

  // componentDidMount: function () {
  //   var us = UserStore.addListener(function () {
  //
  //   });
  //   this.setState({ usToken: us });
  // },

  // componentWillUnmount: function () {
  //
  // },

  render: function () {
    return (
      <div>
        <UserProfileHeader />
        <UserProfileNav />
        <UserProfileNavOptions />
        <div className="profile-main group">
          <div className="profile-sidebar group">
            <div className="test-page-text">USER PROFILE</div>
            <div className="test-page-text">{this.state.user.username}</div>
            <UserInfo userInfo={this.state.user.info} />
            <UserLikesSnapshot />
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
