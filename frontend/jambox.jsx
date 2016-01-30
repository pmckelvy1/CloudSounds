var UserFeed = require('./components/users/user_feed');
var Header = require('./components/header');
var UserProfile = require('./components/users/user_profile');
var UserTracks = require('./components/users/user_tracks');
var UserLikes = require('./components/users/user_likes');
var UserReposts = require('./components/users/user_reposts');
var UserPlaylists = require('./components/users/user_playlists');
var UserAllTracks = require('./components/users/user_all_tracks');
var UploadPage = require('./components/upload');
var SongUpload = require('./components/audio/song_upload');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var SessionForm = require('./components/new_session');
var NewUserForm = require('./components/new_user');
var SongShowPage = require('./components/audio/song_show_page');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
//
// var App = React.createClass({
//
//   render: function () {
//     return (
//       <div>
//         <Header />
//         <h1 className="test-page-text">JAMBOX</h1>
//       </div>
//     );
//   }
// });

var routes = (
  <Route path='/' component={Header}>
    <IndexRoute component={UserFeed} onEnter={_ensureLoggedIn} />
    <Route path='login' component={SessionForm} />
    <Route path='signup' component={NewUserForm} />
    <Route path='/upload' component={SongUpload} onEnter={_ensureLoggedIn} />
    <Route path='/users/:id' component={UserProfile} onEnter={_ensureLoggedIn}>
      <IndexRoute component={UserAllTracks} />
      <Route path='/users/:id/all' component={UserAllTracks} />
      <Route path='/users/:id/tracks' component={UserTracks} />
      <Route path='/users/:id/likes' component={UserLikes} />
      <Route path='/users/:id/reposts' component={UserReposts} />
      <Route path='/users/:id/playlists' component={UserPlaylists} />
    </Route>
    <Route path='/songs/:id' component={SongShowPage} onEnter={_ensureLoggedIn} />
  </Route>
);

function _ensureLoggedIn(nextState, replace, callback) {
  // the third `callback` arg allows us to do async
  // operations before the route runs. Router will wait
  // for us to call it before actually routing
    if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn(); // this function below
  } else {
    // currentUser has not been fetched
    // lets fetch them and then see if
    // we have to redirect or not
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
}


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});
