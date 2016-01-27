var React = require('react'),
    // ApiUtil = require('../util/api_util'),
    LinkedState = require('react-addons-linked-state-mixin');

var UserLogIn = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { email: "", password: "" };
  },

  signInAsGuest: function (e) {
    e.preventDefault();
    ApiUtil.signIn({ email: 'guest_user@guest.com', password: 'guest_password' });
  },

  signInAsUser: function (e) {
    e.preventDefault();
    ApiUtil.signIn(this.state);
  },

  render: function () {
    return (
      <form className="sign-in-up-form group">
        <div>
          <label for="email">Email:</label>
          <input id="email" type="text" valueLink={this.linkState('email')}/>
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" valueLink={this.linkState('password')}/>
        </div>
        <button type="submit" onClick={this.signInAsUser} name="sign-in">Sign In!</button>

        <form className="guest-user-sign-in" method="post">
          <%= auth_token %>
          <input type="hidden" name="user[email]" value="guest_user@guest.com">
          <input type="hidden" name="user[password]" value="guest_password">
          <button type="submit" onClick={this.signInAsGuest} class="guest-sign-in-button">Sign In As Guest!</button>
        </form>
      </form>

    );
  }
});

module.exports = UserLogIn;
