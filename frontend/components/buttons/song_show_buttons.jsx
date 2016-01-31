var React = require('react');
var LikeButton = require('./like_button');
var LikeButtonLarge = require('./like_button_large');

var SongShowButtons = React.createClass({
  render: function () {
    return (
      <div className="song-show-buttons group">
        <LikeButtonLarge song={this.props.song}/>
      </div>
    );
  }
});

module.exports = SongShowButtons;
