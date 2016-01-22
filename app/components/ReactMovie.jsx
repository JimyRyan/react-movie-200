var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.jsx');
var MovieList = require('./MovieList.jsx');
var SearchBar = require('./SearchBar.jsx');
var MovieForm = require('./MovieForm.jsx');
var MovieAPI = require('../api/MovieAPI');
var Home = require('./Home.jsx');

var ReactMovie = React.createClass({

    render: function () {
        return (
            <div>
                <Header />
                <SearchBar onSearch={this.onSearch}/>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ReactMovie;
