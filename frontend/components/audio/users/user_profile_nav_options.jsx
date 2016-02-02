var React = require('react'),
    UserStore = require('../../stores/user_store'),
    FollowButton = require('../buttons/follow_button'),
    EditButton = require('../buttons/edit_button'),
    CurrentUserStore = require('../../stores/current_user_store');

var UserProfileNavOptions = React.createClass({

  render: function () {
    var options;
    if (this.props.user.id == CurrentUserStore.currentUserId()) {
      options = <EditButton />;
    } else {
      options = <FollowButton followedId={this.props.user.id}/>;
    }
    return (
      <div className="user-profile-nav-options">
        {options}
      </div>
    );
  }
});

module.exports = UserProfileNavOptions;
