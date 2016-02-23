var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    History = require('react-router').History;

var SongUpload = React.createClass({
  mixins: [LinkedState, History],

  getInitialState: function () {
    return { title: "", info: "", imageFile: null, imageURL: "", audioFile: null, audioURL: "", uploading: false};
  },

  changeImageFile: function (e) {
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

  changeAudioFile: function (e) {

    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({audioFile: file, audioURL: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({audioFile: null, audioURL: ""});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var songData = new FormData();

    songData.append("song[title]", this.state.title);
    songData.append("song[info]", this.state.info);
    songData.append("song[image]", this.state.imageFile);
    songData.append("song[audio]", this.state.audioFile);

    ApiUtil.createSong(songData, this.uploadSuccess);
    this.setState({ uploading: true });
  },

  resetForm: function() {
    this.setState({title: "", info: "", imageFile: null, imageUrl: ""});
  },

  uploadSuccess: function (newSongId) {
    this.resetForm();
    this.history.pushState(null, '/songs/' + newSongId);
  },

  doNothing: function () {

  },

  renderProgressBar: function () {
    window.requestAnimationFrame(function () {
      $(".meter > span").each(function() {
        $(this)
          .data("origWidth", $(this).width())
          .width(0)
          .animate({
            width: $(this).data("origWidth") // or + "%" if fluid
          }, 1200);
      });
    });
  },

  render: function () {
    var widthStyle;
    if (this.state.audioFile) {
      widthStyle = { width: '100%' };
    } else {
      widthStyle = { width: '0%' };
    }
    this.renderProgressBar();

    var saveButton;
    if (this.state.audioFile === null || this.state.imageFile === null) {
      saveButton = <div className="upload-button disabled">Save</div>;
    } else {
      saveButton = <button className="upload-button enabled">Save</button>;
    }

    var page;
    if (this.state.uploading) {
      page = <div className="song-upload-page">
        <div className="upload-spinner group">
        <div className="loader blue">
        </div>
        </div>
      </div>;
    } else {
      page = <div className="song-upload-page">
        <h2 className="upload-title">Upload to <span className="blue cloud-sounds">CloudSounds!</span></h2>
          <div className="meter animate">
            <span style={widthStyle}><span></span></span>
          </div>
        <form className="song-upload-form group" onSubmit={this.handleSubmit}>

          <input id="audio" type="file" className="song-audio-input custom-audio-input" onChange={this.changeAudioFile}></input>

          <figure className="upload-image-box">
            <input id="artwork" type="file" className="hidden song-artwork-input custom-file-input" onChange={this.changeImageFile}></input>
              <div className="preview-image">
                <img src={this.state.imageURL}/>
              </div>
          </figure>

          <div className="upload-info-box">
          <label htmlFor="title" className="song-title-label upload-label">Title: <span className="blue">*</span></label>
            <input id="title" type="text" className="song-title-input" valueLink={this.linkState('title')}></input>
          <label htmlFor="info" className="song-info-label upload-label">Description: <span className="blue">*</span></label>
            <textarea id="info" className="song-info-input" valueLink={this.linkState('info')}></textarea>
          </div>

          <div className="required-fields"><span className="blue">*</span> Required fields</div>
          {saveButton}
        </form>
      </div>;
    }

    return (
      <div>
        {page}
      </div>
    );
  }
});

module.exports = SongUpload;
