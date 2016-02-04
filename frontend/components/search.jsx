var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var History = require('react-router').History;
var SearchDisplayPage = require('./search_display_page');

var Search = React.createClass({
  mixins: [History],

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return {page: 1, query: ""};
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);
    this.setState({page: 1, query: query});

    this.history.pushState(null, '/results');
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {

    return (
      <div className="search-box">
        <input className="search-input" type="text" placeholder="wut u want" onKeyUp={ this.search } />
      </div>
    );
  },


});

module.exports = Search;
