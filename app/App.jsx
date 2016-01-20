var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.jsx');
var MovieList = require('./MovieList.jsx');
var MovieAPI = require('./api/MovieAPI');

var App = React.createClass({

  render: function () {
    return (
      <div>
        <Header />
        <MovieList />
      </div>
    );
  }
});


ReactDOM.render(<App />, document.getElementById('main'));
