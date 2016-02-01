var React = require('react');

var SongInfo = React.createClass({
  render: function () {
    return (
      <div className="song-info">
        {this.props.song.info}
      </div>
    );
  }
});


module.exports = SongInfo;
