var React = require('react'),
    UserStore = require('../../stores/user_store'),
    FollowButton = require('../buttons/follow_button'),
    EditButton = require('../buttons/edit_button');

var UserProfileNavOptions = React.createClass({

  render: function () {
    var options;
    var currentUserId = document.getElementById('current-user-id').innerHTML;
    if (this.props.user.id == currentUserId) {
      options = <EditButton />;
    } else {
      options = <FollowButton />;
    }
    return (
      <div className="user-profile-nav-options">
        Nav Options
        {options}
      </div>
    );
  }
});

module.exports = UserProfileNavOptions;
