var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserProfileNav = React.createClass({

  render: function () {
    return (
      <div className="user-profile-nav">
        <ul>
          <li><a className="user-profile-nav-tab" href="#/api/users/18/all">All</a></li>
          <li><a className="user-profile-nav-tab" href="#/api/users/18/tracks">Tracks</a></li>
          <li><a className="user-profile-nav-tab" href="#/api/users/18/likes">Likes</a></li>
          <li><a className="user-profile-nav-tab" href="#/api/users/18/reposts">Reposts</a></li>
          <li><a className="user-profile-nav-tab" href="#/api/users/18/playlists">Playlists</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = UserProfileNav;
