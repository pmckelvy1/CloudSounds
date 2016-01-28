var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserProfileNav = React.createClass({

  render: function () {
    var allLink = '#/users/' + this.props.user.id + '/all';
    var tracksLink = '#/users/' + this.props.user.id + '/tracks';
    var likesLink = '#/users/' + this.props.user.id + '/likes';
    var repostsLink = '#/users/' + this.props.user.id + '/reposts';
    var playlistsLink = '#/users/' + this.props.user.id + '/playlists';
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
