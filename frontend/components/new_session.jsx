var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../util/sessions_api_util');
var LinkedState = require('react-addons-linked-state-mixin');
var Welcome = require('./welcome');
var Clouds = require('./clouds');


var SessionForm = React.createClass({
  mixins: [History, LinkedState],
  getInitialState: function () {
    return { email: "", password: "" };
  },

  submit: function (e) {
    e.preventDefault();
    // var credentials = $(e.currentTarget).serializeJSON;
    var credentials = Object.assign({}, this.state);
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  guestSubmit: function (e) {
    e.preventDefault();
    var credentials = { email: 'guest_user@guest.com', password: 'guest_password' };
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {

    return (
      <div className="sign-in-up-page">
        <Welcome />
        <Clouds />
        <form className="sign-in-up-form sign-in-form group" onSubmit={this.submit}>
          <div className="group">
            <label htmlFor="email">Email:</label>
            <input className="user-sign-up-input" id="email" type="text" name="email" valueLink={this.linkState('email')}/>
          </div>
          <div className="group">
            <label htmlFor="password">Password:</label>
            <input className="user-sign-up-input" id="password" type="password" name="password" valueLink={this.linkState('password')}/>
          </div>
          <button type="submit" name="sign-in">Sign In!</button>
        </form>

        <a className="fb-login-button" href="/auth/facebook">Login With Facebook</a>

        <form className="guest-user-sign-in  group" onSubmit={this.guestSubmit} method="post">
          <input type="hidden" name="email" value="guest_user@guest.com"/>
          <input type="hidden" name="password" value="guest_password"/>
          <button type="submit" className="guest-sign-in-button">Sign In As Guest!</button>
        </form>
      </div>
    );
  },

});

module.exports = SessionForm;
