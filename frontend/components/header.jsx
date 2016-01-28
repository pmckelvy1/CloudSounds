var React = require('react');

var Header = React.createClass({

  //
  // navigateToProfile: function () {
  //
  // }

  render: function () {
    var currentUserId = document.getElementById('current-user-id').innerHTML;
    var currentUserProfileLink = '#/users/' + currentUserId;
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

            {/* if logged_in? */}
            <div className="upload-link"><a href="#/upload">Upload</a></div>
            <div className="profile-link"><a href={currentUserProfileLink}>Profile</a></div>
            <div className="alerts"><ul>Aler</ul></div>
            <div className="messages"><ul>Mail</ul></div>
            <div className="settings"><a href="#">Sett</a></div>
            <div>
              <form className="sign-out-form"  method="post">
                <input type="hidden" name="_method" value="DELETE"/>
                {/* auth_token */}
                <button type="button" name="sign-out" className="sign-out-button">Sign Out</button>
              </form>
            </div>
            {/*  else */}
            <div className="sign-in-or-up group">
              <a href="#">Sign Up!</a>
              <a href="#">Sign In!</a>
            </div>
            {/* end */}

          </div>

        </div>
      </div>
      {this.props.children}
    </div>
    );
  }
});

module.exports = Header;
