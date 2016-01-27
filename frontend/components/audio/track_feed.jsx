var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    TrackPlayer = require('./track_player');

var TrackFeed = React.createClass({

  render: function () {
    var trackComponents = this.props.songs.map(function (song) {
      return <TrackPlayer key={song.id} song={song} />;
    });
    return (
      <div className="track-feed">
        {trackComponents}
      </div>
    );
  }
});

module.exports = TrackFeed;
