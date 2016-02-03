var ApiUtil = require('../../util/api_util');

var ApiActions = {
  follow: function(followedId) {
    ApiUtil.follow(followedId);
  },

  unFollow: function(followedId) {
    ApiUtil.unFollow(followedId);
  },

  like: function(songId) {
    ApiUtil.like(songId);
  },

  unLike: function(songId) {
    ApiUtil.unLike(songId);
  },

  addSongToPlaylist: function(playlistId, songId) {
    ApiUtil.addSongToPlaylist(playlistId, songId);
  }
};

module.exports = ApiActions;
