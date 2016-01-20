var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.jsx');
var MovieList = require('./MovieList.jsx');
var SearchBar = require('./SearchBar.jsx');

var App = React.createClass({

    getInitialState: function () {
        return {
            movies: [],
            loading: false
        }
    },

    onSearchBar: function(keyWords) {
        console.log(keyWords);
    },

  render: function () {
    return (
      <div>
        <Header />
        <SearchBar onSearchBar={this.onSearchBar}/>
        <MovieList />
      </div>
    );
  }
});


ReactDOM.render(<App />, document.getElementById('main'));
