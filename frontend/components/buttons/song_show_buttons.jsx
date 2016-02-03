var React = require('react');
var LikeButton = require('./like_button');
var LikeButtonLarge = require('./like_button_large');
var TrackStats = require('../audio/track_stats');

var SongShowButtons = React.createClass({
  render: function () {
    return (
      <div className="song-show-buttons group">
        <LikeButtonLarge song={this.props.song}/>
        <div className="track-stats-large">
          <TrackStats song={this.props.song}/>
        </div>
      </div>
    );
  }
});

module.exports = SongShowButtons;
