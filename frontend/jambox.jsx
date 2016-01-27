var UserFeed = require('./components/users/user_feed');
var Header = require('./components/header');
var UserProfile = require('./components/users/user_profile');
var UserTracks = require('./components/users/user_tracks');
var UserLikes = require('./components/users/user_likes');
var UserReposts = require('./components/users/user_reposts');
var UserPlaylists = require('./components/users/user_playlists');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({

  render: function () {
    return (
      <div>
        <Header />
        <h1 className="test-page-text">JAMBOX</h1>
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={Header}>
    <IndexRoute component={UserFeed} />
    <Route path='/api/users' component={UserFeed} />
    <Route path='/api/users/:id' component={UserProfile}>
      <Route path='/api/users/:id/tracks' component={UserTracks} />
      <Route path='/api/users/:id/likes' component={UserLikes} />
      <Route path='/api/users/:id/reposts' component={UserReposts} />
      <Route path='/api/users/:id/playlists' component={UserPlaylists} />
    </Route>
  </Route>
);


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});
