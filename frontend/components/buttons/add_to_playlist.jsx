var React = require('react');
var CurrentUserStore = require('../../stores/current_user_store');
var ApiActions = require('../../actions/api/api_actions');
var NewPLaylist = require('./new_playlist');
var Modal = require('../../../vendor/assets/javascripts/modal.js');

var AddToPlaylist = React.createClass({
  getInitialState: function () {
    return { modalOpenBool: false };
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

  addToPlaylist: function (e) {
    var playlistId = e.currentTarget.dataset.id;
    ApiActions.addSongToPlaylist(playlistId, this.props.song.id);
    this.setState({ dialogOpen: false });
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
        width                      : '200px',
        height                     : '200px',
        margin                     : 'auto',
        padding                    : '0px'
      }
    };
    if (this.state.modalOpenBool) {
      var playlists = [];
      var userPlaylists = CurrentUserStore.playlists();
      userPlaylists.forEach(function (playlist) {
        playlists.push(
          <li key={playlist.id}>
            <button onClick={this.addToPlaylist} data-id={playlist.id} className="playlist-selection-item">
              {playlist.title}
            </button>
          </li>
        );
      }.bind(this));
    }

    var button;
    if (this.props.large) {
      button = <button className="add-to-playlist-button-large" onClick={this.openModal}><i className="fa fa-th-list"></i> Add to playlist</button>;
    } else {
      button = <button className="add-to-playlist-button" onClick={this.openModal}><i className="fa fa-th-list"></i> Add to playlist</button>;
    }

    return (
      <div className="playlist-modal">
        <Modal
          isOpen={this.state.modalOpenBool}
          onRequestClose={this.closeModal}
          closeTimeoutMS={0}
          style={customStyle}>
          <div className="dialog-container group">
            <ul className="playlist-selection-dialog group">
              {playlists}
            </ul>
            <NewPLaylist song={this.props.song} />
          </div>
        </Modal>
        {button}
      </div>
    );

  }
});

module.exports = AddToPlaylist;
