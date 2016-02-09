var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserProfileHeader = React.createClass({

  render: function () {
    return (
      <div className="user-profile-header gradient-background">
        <div className="user-profile-picture">
          <div className="image-centerer">
            <img src={this.props.user.image_url} />
          </div>
        </div>
        <h1 className="track-artist-name-div-large">
          <div className="artist-name-large">
            {this.props.user.username}
          </div>
        </h1>
      </div>
    );
  }
});

module.exports = UserProfileHeader;
