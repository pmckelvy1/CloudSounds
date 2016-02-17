var React = require("react"),
    ApiActions = require('../../actions/api/api_actions'),
    CurrentUserStore = require('../../stores/current_user_store'),
    LikeStore = require('../../stores/like_store'),
    UserStore = require('../../stores/user_store');

var LikeButton = React.createClass({
  getInitialState: function () {
    return { likes: CurrentUserStore.doesLike(this.props.song.id), numLikes: LikeStore.getNumLikes(this.props.song.id) };
  },

  componentDidMount: function () {
    var cus = CurrentUserStore.addListener(function () {
      this.setState({ likes: CurrentUserStore.doesLike(this.props.song.id) });
    }.bind(this));

    var ls = LikeStore.addListener(function () {
      this.setState({ numLikes: LikeStore.getNumLikes(this.props.song.id) });
    }.bind(this));

    this.setState({ cusToken: cus , lsToken: ls });
  },

  componentWillUnmount: function () {
    this.state.cusToken.remove();
    this.state.lsToken.remove();
  },

  toggleLike: function (e) {
    e.preventDefault();
    if (this.state.likes) {
      ApiActions.unLike(this.props.song.id);
    } else {
      ApiActions.like(this.props.song.id);
    }
  },

  render: function () {
    var likeButtonText;
    var likeButton;
    if (this.state.likes) {
      return (
        <button className="like-button liked"
        onClick={this.toggleLike}>
        <i className="fa fa-heart"></i> {this.state.numLikes}
        </button>
      );
    } else {
      return (
        <button className="like-button not-liked"
        onClick={this.toggleLike}>
        <i className="fa fa-heart-o"></i> {this.state.numLikes}
        </button>
      );
    }
  }

});

module.exports = LikeButton;
