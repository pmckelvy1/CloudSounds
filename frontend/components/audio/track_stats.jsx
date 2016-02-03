var React = require('react');

var TrackStats = React.createClass({
  render: function () {
    var numPlays = this._convertedNum(this.props.song.num_plays);
    var numComms = this._convertedNum(this.props.song.comments.length);
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
    if (parseInt(number) >= 1000) {
      return Math.fround((number % 100)/10) + 'K';
    } else {
      return parseInt(number);
    }
  }
});

module.exports = TrackStats;
