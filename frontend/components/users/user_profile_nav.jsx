var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserProfileNav = React.createClass({
  getInitialState: function () {
    var regex = /\w+$/;
    var location = this.props.pathname;
    var matches = location.match(regex);
    return { location: matches[0] };
  },

  onClick: function (e) {
    var newLoc = e.currentTarget.innerHTML;
    this.setState({ location: newLoc });
  },

  render: function () {
    var allLink = '#/users/' + this.props.user.id + '/all';
    var tracksLink = '#/users/' + this.props.user.id + '/tracks';
    var likesLink = '#/users/' + this.props.user.id + '/likes';
    var repostsLink = '#/users/' + this.props.user.id + '/reposts';
    var playlistsLink = '#/users/' + this.props.user.id + '/playlists';

    var links = [];
    var locs = ['Tracks', 'Likes', 'Playlists'];
    var linkURL;
    for (var idx in locs) {
      linkURL = '#/users/' + this.props.user.id + '/' + locs[idx];
      if (this.state.location == locs[idx]) {
        links.push(<li key={idx}><a className="user-profile-nav-tab selected-tab" href={linkURL} onClick={this.onClick}>{locs[idx]}</a></li>);
      } else {
        links.push(<li key={idx}><a className="user-profile-nav-tab" href={linkURL} onClick={this.onClick}>{locs[idx]}</a></li>);
      }
    }
    return (
      <div className="user-profile-nav">
        <ul>
          {links}
        </ul>
      </div>
    );
  }
});

module.exports = UserProfileNav;
