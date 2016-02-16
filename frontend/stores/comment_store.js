var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CommentConstants = require('../constants/comment_constants'),
    SongConstants = require('../constants/song_constants'),
    CurrentUserConstants = require('../constants/current_user_constants');

var CommentStore = new Store(Dispatcher);

var _comments = {};

var resetComments = function (comments) {
  comments.forEach(function(comment) {
    if (_comments[comment.song_id]) {
      _comments[comment.song_id].unshift(comment);
    } else {
      _comments[comment.song_id] = [comment];
    }
  });
};

var addSong = function (song) {
  _comments[song.id] = song.comments;
};

var addComment = function (comment) {
  if (_comments[comment.song_id]) {
    _comments[comment.song_id].unshift(comment);
  } else {
    _comments[comment.song_id] = [comment];
  }
};

var addManySongs = function (songs) {
  songs.forEach(function(song) {
    _comments[song.id] = song.comments;
  });
};

CommentStore.getSongComments = function (songId, startIdx, endIdx) {
  if (startIdx) {
    return _comments[songId].slice(startIdx, endIdx);
  } else {
    if (_comments[songId]) {
      return _comments[songId];
    } else {
      return [];
    }
  }
};

CommentStore.hasComments = function (songId) {
  if (_comments[songId]) {
    return true;
  } else {
    return false;
  }
};

CommentStore.getNumComments = function (songId) {
  if (_comments[songId]) {
    return _comments[songId].length;
  } else {
    return 0;
  }
};

CommentStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SongConstants.SONG_RECEIVED:
      addSong(payload.song);
      CommentStore.__emitChange();
      break;
    case CommentConstants.RECEIVE_NEW_COMMENT:
      addComment(payload.comment);
      CommentStore.__emitChange();
      break;
    case SongConstants.SONGS_RECEIVED:
      addManySongs(payload.songs);
      CommentStore.__emitChange();
      break;
    case SongConstants.USER_SONGS_RECEIVED:
      addManySongs(payload.songs);
      CommentStore.__emitChange();
      break;
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      addManySongs(payload.currentUser.followed_songs);
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
