var React = require('react'),
    UserStore = require('react');

var UserItem = React.createClass({

  render: function () {
    return (
      <div className="user-item group">
        <div className="user-profile-thumb"><img src="/assets/guest_profile_picture.jpg"/></div>
        <h2 className="user-name">{this.props.user.username}</h2>
      </div>
    );
  }
});

module.exports = UserItem;
