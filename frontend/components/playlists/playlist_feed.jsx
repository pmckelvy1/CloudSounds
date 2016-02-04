var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    PlaylistTrackPlayer = require('./playlist_track_player');

var PlaylistFeed = React.createClass({

  render: function () {
    var trackComponents;
    if (this.props.playlists.length === 0) {
      trackComponents = <div className="no-songs">There's nothing here...</div>;
    } else {
      trackComponents = this.props.playlists.map(function (playlist) {
        return <PlaylistTrackPlayer key={playlist.id} playlist={playlist} />;
      });
    }
    return (
      <div className="track-feed">
        {trackComponents}
      </div>
    );
  }
});

module.exports = PlaylistFeed;
