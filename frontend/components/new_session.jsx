var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../util/sessions_api_util');
var LinkedState = require('react-addons-linked-state-mixin');

var SessionForm = React.createClass({
  mixins: [History, LinkedState],
  getInitialState: function () {
    return { email: "", password: "" };
  },

  submit: function (e) {
    e.preventDefault();
    var userData = new FormData();
    userData.append('user[email]', this.state.email);
    userData.append('user[password]', this.state.password);
    debugger
    // var credentials = $(e.currentTarget).serializeJSON;
    var credentials = Object.assign({}, this.state);
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  guestSubmit: function (e) {
    e.preventDefault();
    var userData = new FormData();
    userData.append('user[email]', 'guest_user@guest.com');
    userData.append('user[password]', 'guest_password');
    SessionsApiUtil.login(userData, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {

    return (
      <div>

        <form className="sign-in-up-form group" onSubmit={this.submit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input id="email" type="text" name="email" valueLink={this.linkState('email')}/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" valueLink={this.linkState('password')}/>
          </div>
          <button type="submit" name="sign-in">Sign In!</button>
        </form>

        <form className="guest-user-sign-in sign-in-up-form group" onSubmit={this.guestSubmit} method="post">
          <input type="hidden" name="email" value="guest_user@guest.com"/>
          <input type="hidden" name="password" value="guest_password"/>
          <button type="submit" className="guest-sign-in-button">Sign In As Guest!</button>
        </form>
      </div>
    );
  },

});

module.exports = SessionForm;
