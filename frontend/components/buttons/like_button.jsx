var React = require("react"),
    ApiActions = require('../../actions/api/api_actions'),
    LikeStore = require('../../stores/like_store');

var LikeButton = React.createClass({
  getInitialState: function () {
    return { likes: LikeStore.doesLike(this.props.songId) };
  },

  componentDidMount: function () {
    var ls = LikeStore.addListener(function () {
      // set the like state
      this.setState({ likes: LikeStore.doesLike(this.props.songId)});
      // if there is a like, grab it
      if (LikeStore.doesLike(this.props.songId)) {
        this.setState({ like: LikeStore.find(this.props.songId)});
      }
    }.bind(this));
    this.setState({ lsToken: ls });
  },

  componentWillUnmount: function () {
    this.state.lsToken.remove();
  },

  toggleFollow: function (e) {
    e.preventDefault();
    if (this.state.likes) {
      ApiActions.unLike(this.state.like);
    } else {
      ApiActions.like(this.props.songId);
    }
  },

  render: function () {
    var likeButtonText;
    if (this.state.likes) {
      likeButtonText = "♥";
    } else {
      likeButtonText = "♡";
    }
    return (
      <button className="like-button" onClick={this.toggleFollow}>{likeButtonText}</button>
    );
  }

});

module.exports = LikeButton;
