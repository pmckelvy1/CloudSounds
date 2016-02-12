var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    CurrentPlayingSongStore = require('../../stores/current_playing_song_store'),
    LinkedState = require('react-addons-linked-state-mixin'),
    CurrentUserStore = require('../../stores/current_user_store');

var CommentInputBoxSmall = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { body: "" };
  },

  submit: function (e) {
    e.preventDefault();
    var commentData = {
      body: this.state.body,
      song_id: this.props.songId,
      time_stamp: Math.fround(CurrentPlayingSongStore.getCurrentTime(this.props.songId))
    };
    ApiUtil.createComment(commentData, this.clearForm);
  },

  getTimeStamp: function () {

  },

  clearForm: function () {
    this.setState({ body: "" });
  },

  render: function () {
    var imgURL = CurrentUserStore.getCurrentUserProfilePic();
    var extendStyle;
    if (this.props.extended) {
      extendStyle = { opacity: 1, transition: 'opacity 1s ease' };
    }
    return (
      <div className="comment-input-box-small" style={extendStyle}>
        <form onSubmit={this.submit}>
          <img className="comment-input-thumb-small" src={imgURL} />
          <input id="body" type="text" onInput={this.getTimeStamp} className="comment-body-input-small" valueLink={this.linkState('body')}></input>
        </form>
    </div>
    );
  }
});

module.exports = CommentInputBoxSmall;
