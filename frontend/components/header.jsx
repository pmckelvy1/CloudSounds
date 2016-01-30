var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionApiUtil = require('../util/sessions_api_util');
var History = require('react-router').History;


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
            <div className="header-logo"><img src='/assets/note.png'/></div>
            <div className="home"><a href="#">Home</a></div>
            <div className="collection"><a href="#">Collection</a></div>
          </div>

          <div className="header-nav-profile-nav group">
            <div className="upload-link"><a href="#/upload">Upload</a></div>
            <div className="profile-link"><a href={currentUserProfileLink}>Profile</a></div>
            <div className="alerts"><ul>Aler</ul></div>
            <div className="messages"><ul>Mail</ul></div>
            <div className="settings"><a href="#">Sett</a></div>
            {sessionButtons}
          </div>

        </div>
      </div>
      {this.props.children}
    </div>
    );
  }
});

module.exports = Header;
