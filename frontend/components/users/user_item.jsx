var React = require('react'),
    UserStore = require('react'),
    FollowButton = require('../buttons/follow_button');

var UserItem = React.createClass({

  render: function () {
    return (
      <div className="user-item group">
        <div className="user-profile-thumb"><img src="/assets/guest_profile_picture.jpg"/></div>
        <h2 className="user-name">{this.props.user.username}</h2>
        <FollowButton followedId={this.props.user.id} />
      </div>
    );
  }
});

module.exports = UserItem;
