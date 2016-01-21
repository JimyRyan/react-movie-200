var React = require('react');

var SearchBar = React.createClass({
    propTypes: {
        onSearch: React.PropTypes.func.isRequired
    },

    onSearch: function() {
        var keyWords = this.refs.searchBar.value;

        this.props.onSearch(keyWords)
    },

    render: function () {
    return (
        <div className="search-bar-container input-group">
          <input type="text" ref="searchBar" className="form-control" placeholder="Search for..." />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.onSearch}>Search</button>
          </span>
        </div>
    );
  }
});

module.exports = SearchBar;
