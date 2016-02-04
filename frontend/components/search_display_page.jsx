var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');

var SearchDisplayPage = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function () {
    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      if (searchResult._type === "User") {
        return <li key={searchResult.id} className="search-result-index-item">{searchResult.username}</li>;
      } else {
        return <li key={searchResult.id} className="search-result-index-item">{searchResult.username}</li>;
      }
    });

    return (
      <div className="search-results-page">
        Displaying {SearchResultsStore.all().length} of
        {SearchResultsStore.meta().totalCount}
        <ul className="search-results-index">
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = SearchDisplayPage;
