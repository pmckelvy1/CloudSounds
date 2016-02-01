var React = require("react"),
    ApiActions = require('../../actions/api/api_actions'),
    CurrentUserStore = require('../../stores/current_user_store');

var LikeButtonLarge = React.createClass({
  getInitialState: function () {
    return { likes: CurrentUserStore.doesLike(this.props.song.id) };
  },

  componentDidMount: function () {
    var cus = CurrentUserStore.addListener(function () {
      // set the like state
      this.setState({ likes: CurrentUserStore.doesLike(this.props.song.id)});
      // if there is a like, grab it
      // if (CurrentUserStore.doesLike(this.props.song.id)) {
      //   this.setState({ like: CurrentUserStore.find(this.props.song.id)});
      // }
    }.bind(this));
    this.setState({ cusToken: cus });
  },

  componentWillUnmount: function () {
    this.state.cusToken.remove();
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
      likeButtonText = <i className="fa fa-heart"> Liked</i>;
      likeButton = <button className="like-button-large liked"
        onClick={this.toggleLike}>{likeButtonText}</button>;
    } else {
      likeButtonText = <i className="fa fa-heart-o"> Like</i>;
      likeButton = <button className="like-button-large not-liked"
        onClick={this.toggleLike}>{likeButtonText}</button>;
    }
    return (
      <div>
        {likeButton}
      </div>
    );
  }

});

module.exports = LikeButtonLarge;
