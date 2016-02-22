var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    TrackPlayer = require('./track_player'),
    Infinite = require('react-infinite');

var TrackFeed = React.createClass({
  getInitialState: function () {
    return { isInfiniteLoading: false,
              tracks: this.buildTracks(0, 5) };
  },

  canInfiniteLoad: function () {
    return !(this.state.tracks.length === this.props.songs.length);
  },

  buildTracks: function (start, end) {
    var trackComponents;
    if(this.props.songs.length === 0) {
      trackComponents = <div className="no-songs">There's nothing here...</div>;
    } else {
      var song;
      trackComponents = [];
      for (var i = start; i < end && i < this.props.songs.length; i++) {
        song = this.props.songs[i];
        trackComponents.push(<TrackPlayer key={song.id} song={song} />);
      }
    }
    return trackComponents;
  },

  handleInfiniteLoad: function () {
    if (this.canInfiniteLoad()) {
      this.setState({ isInfiniteLoading: true });
      setTimeout(function () {
        var numTracks = this.state.tracks.length;
        var newTracks = this.buildTracks(numTracks, numTracks + 5);
        this.setState({ tracks: this.state.tracks.concat(newTracks),
          isInfiniteLoading: false });
        }.bind(this), 1000);
    }
  },

  infiniteLoading: function () {
    if (this.canInfiniteLoad() && this.props.songs.length > 0) {
      return (
        <div className="loader"></div>
      );
    } else {
      return (
        <div className="page-bottom">
          <i className="fa fa-cloud center grey"></i>
        </div>
      );
    }
  },

  render: function () {
    return (
      <Infinite className="track-feed"
                elementHeight={200}
                useWindowAsScrollContainer={true}
                infiniteLoadBeginEdgeOffset={100}
                onInfiniteLoad={this.handleInfiniteLoad}
                loadingSpinnerDelegate={this.infiniteLoading()}
                isInfiniteLoading={this.state.isInfiniteLoading}>
                {this.state.tracks}
      </Infinite>
    );
  }
});

module.exports = TrackFeed;
