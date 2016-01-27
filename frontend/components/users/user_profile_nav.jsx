var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserProfileNav = React.createClass({

  render: function () {
    var allLink = '#/api/users/' + this.props.userId + '/all';
    var tracksLink = '#/api/users/' + this.props.userId + '/tracks';
    var likesLink = '#/api/users/' + this.props.userId + '/likes';
    var repostsLink = '#/api/users/' + this.props.userId + '/reposts';
    var playlistsLink = '#/api/users/' + this.props.userId + '/playlists';
    return (
      <div className="user-profile-nav">
        <ul>
          <li><a className="user-profile-nav-tab" href={allLink}>All</a></li>
          <li><a className="user-profile-nav-tab" href={tracksLink}>Tracks</a></li>
          <li><a className="user-profile-nav-tab" href={likesLink}>Likes</a></li>
          <li><a className="user-profile-nav-tab" href={repostsLink}>Reposts</a></li>
          <li><a className="user-profile-nav-tab" href={playlistsLink}>Playlists</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = UserProfileNav;
