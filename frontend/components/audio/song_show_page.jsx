var React = require('react');
var ApiUtil = require('../../util/api_util');
var SongStore = require('../../stores/song_store');
var TrackPlayerLarge = require('./track_player_large');
var CommentInputBox = require('../comments/comment_input_box');
var CommentIndexLarge = require('../comments/comment_index_large');
var LikeButton = require('../buttons/like_button');

var SongShowPage = React.createClass({
  getInitialState: function () {
    return { song: {} };
  },

  componentDidMount: function () {
    var ss = SongStore.addListener(this.onChange);
    this.setState({ ssToken: ss });
    ApiUtil.fetchSingleSong(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.state.ssToken.remove();
  },

  onChange: function () {
    this.setState({ song: SongStore.getSong() });
  },

  render: function () {
    if (Object.keys(this.state.song).length === 0) {
      return (
        <div className="loader">Loading...</div>
      );
    } else {
      return (
        <div className="user-show-page">
          <TrackPlayerLarge song={this.state.song} />
          <CommentInputBox song={this.state.song} />
          <CommentIndexLarge songId={this.state.song.id} />
          <LikeButton className="like-button" song={this.state.song}/>
        </div>
      );
    }
  }

});

module.exports = SongShowPage;
