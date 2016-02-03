var React = require('react');
var ApiUtil = require('../../util/api_util');
var SongStore = require('../../stores/song_store');
var TrackPlayerLarge = require('./track_player_large');
var CommentInputBox = require('../comments/comment_input_box');
var CommentIndexLarge = require('../comments/comment_index_large');
var LikeButton = require('../buttons/like_button');
var CurrentUserStore = require('../../stores/current_user_store');
var CommentIndexLargeUserInfo = require('../comments/comment_index_large_user_info');
var SongShowButtons = require('../buttons/song_show_buttons');
var SongInfo = require('./song_info');
var TrackStats = require('./track_stats');

var SongShowPage = React.createClass({
  getInitialState: function () {
    return { song: {}, currentUserProfilePic: CurrentUserStore.getCurrentUserProfilePic() };
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
          <div className="song-show-page-main">
            <div className="comment-input-thumb-enlcosure group">
              <img className="comment-input-thumb" src={this.state.currentUserProfilePic}/>
              <CommentInputBox songId={this.state.song.id} />
            </div>
            <SongShowButtons song={this.state.song} />
            <CommentIndexLargeUserInfo user={this.state.song.user} />
            <div className="song-info-and-comments">
              <SongInfo song={this.state.song} />
              <CommentIndexLarge songId={this.state.song.id} />
            </div>
          </div>
          <div className="song-show-page-sidebar">

          </div>
        </div>
      );
    }
  }

});

module.exports = SongShowPage;
