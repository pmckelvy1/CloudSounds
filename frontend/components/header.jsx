var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionApiUtil = require('../util/sessions_api_util');
var History = require('react-router').History;
var SongPlaybackFooter = require('./audio/song_playback_footer');
var Search = require('./search');
var NotificationIndex = require('./notifications/notification_index');


var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      currentUser: CurrentUserStore.currentUser()
    };
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  logout: function () {
    this.setState({ currentUser: {} });
    SessionApiUtil.logout(function () {
      this.history.pushState({}, '/login');
    }.bind(this));
  },

  render: function () {
    var currentUserProfileLink = '#/users/' + this.state.currentUser.id;
    var sessionButtons;
    if (CurrentUserStore.isLoggedIn()) {
      sessionButtons =  <div>
        <Search />
        <div className="upload-link"><a href="#/upload">Upload</a></div>
        <div className="profile-link">
          <a href={currentUserProfileLink}>
            <div className="thumb-tiny">
              <div className="image-centerer">
                <img src={this.state.currentUser.image_url} />
              </div>
            </div>
          Profile</a></div>
        <div className="alerts white"><ul><i className="fa fa-bell"></i></ul></div>
        <div className="messages white"><ul><i className="fa fa-envelope"></i></ul></div>
        <div className="settings white"><a href="#"><i className="fa fa-cog"></i></a></div>
        <button onClick={this.logout} className="sign-out-button">Sign Out</button>
      </div>;
    } else {
      sessionButtons =  <div className="sign-in-or-up group">
        <a href="#/signup">Sign Up!</a>
        <a href="#/login">Sign In!</a>
      </div>;
    }
    return (
      <div>
        <div className="header group">
          <div className="header-nav group">

            <div className="header-nav-site-nav group">

              <div className="header-logo">
                <i className="fa fa-music blue header-logo-note"></i>
                <i className="fa fa-cloud fa-2x header-logo-cloud"></i>
              </div>
              <div className="home header-left"><a href="#">Home</a></div>
              <div className="collection header-left"><a href="#">Collection</a></div>
            </div>

            <div className="header-nav-profile-nav group">
              {sessionButtons}
            </div>

          </div>
        </div>
        {this.props.children}
        <SongPlaybackFooter />
        <NotificationIndex />
      </div>
    );
  }
});

module.exports = Header;
