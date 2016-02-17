var React = require('react');
var Modal = require('../../../vendor/assets/javascripts/modal.js');
var LinkedState = require('react-addons-linked-state-mixin');
var SessionsApiUtil = require('../../util/sessions_api_util');

var EditButton = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { modalOpenBool: false,
      email: this.props.user.email,
      username: this.props.user.username,
      info: this.props.user.info,
      imageFile: null,
      imageURL: this.props.user.image_url
    };
  },

  openModal: function () {
    $('.thumb-super-mini').hide();
    $('canvas').hide();
    this.setState({ modalOpenBool: true });
  },

  closeModal: function () {
    $('.thumb-super-mini').show();
    $('canvas').show();
    this.setState({ modalOpenBool: false });
  },

  submit: function (e) {
    e.preventDefault();
    // var credentials = $(e.currentTarget).serializeJSON;
    var userData = new FormData();

    userData.append("user[email]", this.state.email);
    userData.append("user[username]", this.state.username);
    userData.append("user[info]", this.state.info);
    userData.append("user[image]", this.state.imageFile);

    SessionsApiUtil.updateUser(userData, this.props.user.id, function () {
      this.closeModal();
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

  render: function () {
    Modal.setAppElement('body');
    var customStyle = {
      overlay: {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.8)'
      },
      content : {
        position                   : 'absolute',
        top                        : '50px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        color                      : 'black',
        width                      : '760px',
        height                     : '400px',
        margin                     : 'auto',
        padding                    : '0px'
      }
    };
    return (
      <div className="edit-modal">
        <Modal
          isOpen={this.state.modalOpenBool}
          onRequestClose={this.closeModal}
          closeTimeoutMS={0}
          style={customStyle}>

          <form className="edit-form group" onSubmit={this.submit}>
            <div className="edit-form-title">Edit User Profile</div>
            <div className="user-info-box">
              <div  className="group">
                <label htmlFor="email">Email:</label>
                <input className="user-sign-up-input" id="email" type="text" name="email" valueLink={this.linkState('email')}/>
              </div>
              <div className="group">
                <label htmlFor="username">Artist name:</label>
                <input className="user-sign-up-input" id="username" type="text" name="username" valueLink={this.linkState('username')}/>
              </div>
              <div className="group">
                <label htmlFor="info">Artist info:</label>
                <textarea id="info" name="info" valueLink={this.linkState('info')}/>
              </div>
            </div>
            <div className="upload-image-box">
              <input id="artwork" type="file" className="hidden profile-picture-input custom-file-input" onChange={this.changeFile}></input>
              <img className="preview-image" src={this.state.imageURL}/>
            </div>

            <button type="submit" name="sign-in">Save</button>
          </form>
        </Modal>
        <button className="edit-button" onClick={this.openModal}>Edit</button>
      </div>
    );
  }

});

module.exports = EditButton;
