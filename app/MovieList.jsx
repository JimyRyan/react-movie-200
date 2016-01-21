var React = require('react');
var Movie = require('./Movie.jsx');

var MovieList = React.createClass({

    propTypes: {
        // Récupération de la fonction de callback pour supprimer un Movie
        onMovieDeletion: React.PropTypes.func
    },

    render: function () {
        var movies = this.props.movies;
        var onMovieDeletion = this.props.onMovieDeletion;
        var moviesTag = movies.map(function (movie) {
            return <Movie key={movie.id} film={movie} onMovieDeletion={onMovieDeletion}/>
        });
        var content;

        if (this.props.loadingMovies) {
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
