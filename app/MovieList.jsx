var React = require('react');
var Movie = require('./Movie.jsx');

var MovieList = React.createClass({

    // Solution préférable
    shouldComponentUpdate: function (nextProps, nextState) {

        var oldSearchKey = this.props.searchKey;
        var newSearchKey = nextState.searchKey;

        // Changement du mot clef ou actualisation des films
        if (oldSearchKey !== newSearchKey || this.props.movies !== nextState.movies) {
            return true;
        } else {
            return false;
        }
    },

    render: function () {
        var movies = this.props.movies;
        var onMovieDeletion = this.props.onMovieDeletion;
        var searchKey = this.props.searchKey;
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
