var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../util/sessions_api_util');
var LinkedState = require('react-addons-linked-state-mixin');
var Welcome = require('./welcome');
var Clouds = require('./clouds');

var NewUserForm = React.createClass({
  mixins: [History, LinkedState],
  getInitialState: function () {
    return { email: "", password: "", info: "", username: "", imageFile: null, imageURL: "" };
  },

  submit: function (e) {
    e.preventDefault();
    // var credentials = $(e.currentTarget).serializeJSON;
    var userData = new FormData();

    userData.append("user[email]", this.state.email);
    userData.append("user[username]", this.state.username);
    userData.append("user[password]", this.state.password);
    userData.append("user[info]", this.state.info);
    // userData.append("user[image]", this.state.imageFile);

    SessionsApiUtil.createNewUser(userData, function () {
      // this.resetForm();
      this.history.pushState({}, "/");
    }.bind(this));
  },

  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageURL: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  render: function() {

    return (
      <div className="sign-in-up-page">
        <Welcome />
        <Clouds />
        <form className="sign-in-up-form sign-up-form group" onSubmit={this.submit}>
          <div className="user-info-box">
            <div>
              <label htmlFor="email">Email:</label>
              <input id="email" type="text" name="email" valueLink={this.linkState('email')}/>
            </div>
            <div>
              <label htmlFor="email">Artist name:</label>
              <input id="email" type="text" name="username" valueLink={this.linkState('username')}/>
            </div>
            <div>
              <label htmlFor="email">Artist info:</label>
              <input id="email" type="text" name="info" valueLink={this.linkState('info')}/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" name="password" valueLink={this.linkState('password')}/>
            </div>
          </div>
          <div className="upload-image-box">
            <input id="artwork" type="file" className="profile-picture-input custom-file-input" onChange={this.changeFile}></input>
            <img className="preview-image" src={this.state.imageURL}/>
          </div>

          <button type="submit" name="sign-in">Sign Up!</button>
        </form>

      </div>
    );
  },

});

module.exports = NewUserForm;
