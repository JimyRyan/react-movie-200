var React = require('react');
var ReactDOM = require('react-dom');

var SearchBar = React.createClass({
    propTypes: {
        onMovieSearch: React.PropTypes.func.isRequired
    },

    onSearch: function() {
        var keyWords = this.refs.movieSearch.value;

        props.onMovieSearch(keyWords)
    },

    render: function () {
    return (
        <div className="search-bar-container input-group">
          <input type="text" ref="movieSearch" className="form-control" placeholder="Search for..." />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.onSearch}>Search</button>
          </span>
        </div>
    );
  }
});

module.exports = SearchBar;
