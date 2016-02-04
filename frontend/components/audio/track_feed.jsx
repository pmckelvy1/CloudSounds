var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    TrackPlayer = require('./track_player');

var TrackFeed = React.createClass({

  render: function () {
    var trackComponents;
    if(this.props.songs.length === 0) {
      trackComponents = <div className="no-songs">There's nothing here...</div>;
    } else {
      trackComponents = this.props.songs.map(function (song) {
        return <TrackPlayer key={song.id} song={song} />;
      });
    }
    return (
      <div className="track-feed">
        {trackComponents}
      </div>
    );
  }
});

module.exports = TrackFeed;
