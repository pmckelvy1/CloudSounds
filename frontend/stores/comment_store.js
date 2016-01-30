var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CommentConstants = require('../constants/comment_constants'),
    SongConstants = require('../constants/song_constants');

var CommentStore = new Store(Dispatcher);

var _comments = {};

var resetComments = function (comments) {
  _comments = {};
  comments.forEach(function(comment) {
    if (_comments[comment.song_id]) {
      _comments[comment.song_id].push(comment);
    } else {
      _comments[comment.song_id] = [comment];
    }
  });
};

var addComment = function (comment) {
  if (_comments[comment.song_id]) {
    _comments[comment.song_id].push(comment);
  } else {
    _comments[comment.song_id] = [comment];
  }
};

CommentStore.getSongComments = function (songId) {
  return _comments[songId];
};

CommentStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SongConstants.SONG_RECEIVED:
      resetComments(payload.song.comments);
      CommentStore.__emitChange();
      break;
    case CommentConstants.RECEIVE_NEW_COMMENT:
      addComment(payload.comment);
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
