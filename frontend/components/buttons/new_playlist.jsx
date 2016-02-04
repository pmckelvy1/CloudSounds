var React = require('react');
var ApiUtil = require('../../util/api_util');
var LinkedState = require('react-addons-linked-state-mixin');


var NewPLaylist = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { title: "" , open: false };
  },

  onSubmit: function (e) {
    e.preventDefault();
    var playlistData = { title: this.state.title, song_id: this.props.song.id };
    ApiUtil.createPlaylist(playlistData);
    this.setState({ open: false });
  },

  openForm: function () {
    this.setState({ open: true });
  },

  render: function () {
    if (this.state.open === true) {
      return (
        <form className="new-playlist-form group" onSubmit={this.onSubmit}>
          <label forHTML="title" className="new-playlist-form-title">Title:</label>
          <input id="title" type="text" valueLink={this.linkState('title')}></input>
          <button className="new-playlist-button">Create playlist</button>
        </form>
      );
    } else {
      return (
        <li>
          <button onClick={this.openForm} className="playlist-selection-item"><i className="fa fa-plus"></i> Create new</button>
        </li>

      );
    }
  }
});

module.exports = NewPLaylist;
