var React = require('react');
var Movie = require('./Movie.jsx');
var axios = require('axios');

var MOVIES_API_URL = "/server/api/movies";

var MovieList = React.createClass({

	getInitialState: function() {
		return {movies: {loading: true, data: []}};
	},

	componentWillMount: function() {

		// Loading

		// Make a request for a user with a given ID
		axios.get(MOVIES_API_URL)
			.then(function (response) {
				//console.log(response);
				this.setState({
					movies: {loading: false, data: response.data }
				})

			}.bind(this))
			.catch(function (response) {
				//console.log(response);
			});
	},


	render: function () {

		if (this.state.loading) {

			return (
				<div class="loading">Loading&#8230;</div>
			)
		}

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
