var React = require('react');
var Movie = require('./Movie.jsx');
var MovieAPI = require('./api/MovieAPI');

var MovieList = React.createClass({

    // Fonction pour supprimer un movie
    onMovieDeletion: function (id) {
        MovieAPI.removeMovie(id).then(function () {
            // this = context MovieList
            var filteredMovieList = this.state.movies.filter(function (movie) {
                return movie.id !== id;
            });

            this.setState({
                movies: filteredMovieList
            });
        }.bind(this)); // Ce bind permet de concerver le context du composant MovieList
    },

    getInitialState: function () {
        return {
            movies : [],
            loading: false
        }
    },

    componentWillMount: function () {
        this.setState({
            loading: true
        });

        MovieAPI.getMovieList().then(function (movies) {
            this.setState({
                movies : movies,
                loading: false
            })
        }.bind(this));
    },

    render: function () {
        var movies = this.state.movies;
        var onMovieDeletion = this.onMovieDeletion;
        var moviesTag = movies.map(function (movie) {
            return <Movie key={movie.id} film={movie} onMovieDeletion={onMovieDeletion}/> // ---> Passage de la fonction de supprimer au module en charge de la gestion d'un Movie
        }.bind(this));
        var content;

        if (this.state.loading) {
            content = <li>Chargement de la liste des films en cours</li>
        } else {
            content = moviesTag;
        }

        return (
            <ul className="thumbnails list-unstyled">
                {content}
            </ul>
        );
    }
});

module.exports = MovieList;
