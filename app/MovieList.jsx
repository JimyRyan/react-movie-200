var React = require('react');
var Movie = require('./Movie.jsx');
var axios = require('axios');

var MOVIES_API_URL = "/server/api/movies";

var MovieList = React.createClass({

	// Init the data
	getInitialState: function() {
		return {movies: {loading: false, data: []}};
	},

	// Load the movies
	componentWillMount: function () {

		// Will display the loading...
		this.setState({
			movies: {loading: true}
		});

		// Make a request for a user with a given ID
		axios.get(MOVIES_API_URL)
			.then(function (response) {
				//console.log(response);
				this.setState({
					movies: {loading: false, data: response.data }
				})

			}.bind(this))
			.catch(function (response) {
				console.log(response);
		});
	},


	render: function () {

		// While movies is loading, display the spinner and exit
		if (this.state.movies.loading) {
			return (
				<div className="loading">Loading&#8230;</div>
			)
		}

		// When the movies are loaded, remove the spiner and display the movies
		var moviesJson = this.state.movies.data;
		var movies = moviesJson.map(function (movie) {
      		return <Movie film={movie} />
    	});

    	return (
      		<ul className="thumbnails list-unstyled">
        		{movies}
      		</ul>
    	);
  }
});

module.exports = MovieList;
