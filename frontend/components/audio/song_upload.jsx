var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util');

var SongUpload = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { title: "", info: "", imageFile: null, imageURL: "", audioFile: null, audioURL: ""};
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
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var songData = new FormData();

    songData.append("song[title]", this.state.title);
    songData.append("song[info]", this.state.info);
    songData.append("song[image]", this.state.imageFile);
    songData.append("song[audio]", this.state.audioFile);

    ApiUtil.createSong(songData, this.resetForm);
  },

  resetForm: function() {
    this.setState({title: "", info: "", imageFile: null, imageUrl: ""});
  },

  render: function () {

    return (
      <div>
        <h2 className="upload-title">Upload to Jambox</h2>
        <form className="song-upload-form group" onSubmit={this.handleSubmit}>

          <label htmlFor="title" className="song-title-label upload-label">Title:</label>
            <input id="title" type="text" className="song-title-input" valueLink={this.linkState('title')}></input>


          <label htmlFor="info" className="song-info-label upload-label">Description:</label>
            <textarea id="info" className="song-info-input" valueLink={this.linkState('info')}></textarea>


          <label htmlFor="artwork" className="song-artwork-label upload-label">Upload song artwork:</label>
            <input id="artwork" type="file" className="song-artwork-input" onChange={this.changeImageFile}></input>


          <img className="preview-image" src={this.state.imageURL}/>
          <button className="upload-button">Upload</button>

          <label htmlFor="audio" className="song-audio-label upload-label">Upload song audio:</label>
            <input id="audio" type="file" className="song-audio-input" onChange={this.changeAudioFile}></input>

        </form>
      </div>
    );
  }
});

module.exports = SongUpload;
