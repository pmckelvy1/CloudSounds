var React = require('react');
var CommentStore = require('../../stores/comment_store');
var SongStore = require('../../stores/song_store');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');

var TrackStats = React.createClass({
  getInitialState: function () {
    return { numComments: this.props.song.comments.length,
              numPlays: this.props.song.num_plays };
  },

  componentDidMount: function () {
    var commentStoreToken = CommentStore.addListener(this.updateNumComments);
    var songStoreToken = CurrentPlayingSongStore.addListener(this.updateNumPlays);
    this.setState({ commentStoreToken: commentStoreToken,
                    songStoreToken: songStoreToken });
  },

  componentWillUnmount: function () {
    this.state.commentStoreToken.remove();
    this.state.songStoreToken.remove();
  },

  updateNumPlays: function () {
    this.setState({ numPlays: CurrentPlayingSongStore.getNumPlays(this.props.song.id) });
  },

  updateNumComments: function () {
    this.setState({ numComments: CommentStore.getNumComments(this.props.song.id) });
  },

  render: function () {
    var numPlays = this._convertedNum(this.state.numPlays);
    var numComms = this._convertedNum(this.state.numComments);
    return (
      <div className='track-stats'>
        <div className='track-stat'>
          <i className="fa fa-play"></i> {numPlays}
        </div>
        <div className='track-stat'>
          <i className="fa fa-comment"></i> {numComms}
        </div>
      </div>
    );
  },

  _convertedNum: function (number) {
    if (parseInt(number) >= 1000000) {
      return (Math.round(number / 100000) / 10) + 'M';
    } else if (parseInt(number) >= 1000) {
      return (Math.round(number / 100) / 10) + 'K';
    } else {
      return parseInt(number);
    }
  }
});

module.exports = TrackStats;
