var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserProfileHeader = React.createClass({

  render: function () {
    return (
      <div className="user-profile-header">
        <img className="user-profile-picture" src={this.props.user.image_url} />
      </div>
    );
  }
});

module.exports = UserProfileHeader;
