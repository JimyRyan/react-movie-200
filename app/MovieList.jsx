var React = require('react');
var Movie = require('./Movie.jsx');

var MovieList = React.createClass({
  shouldComponentUpdate: function (nextProps) {
    return this.props.searchKey !== nextProps.searchKey || this.props.movies !== nextProps.movies;
  },

  render: function () {
    var movies = this.props.movies;
    var onMovieDeletion = this.props.onMovieDeletion;
    var onMovieModification = this.props.onMovieModification;
    var searchKey = this.props.searchKey;
    var moviesTag = movies.filter(function (movie) {
                        return movie.title.toLowerCase().match(searchKey.toLowerCase());
                      })
                      .map(function (movie) {
                        return <li className="list-group-item" key={movie.id}><a>{movie.title}</a></li>;
                      });
    var content;

    if (this.props.loadingMovies) {
      content = <li>Chargement de la liste des films en cours</li>
    } else {
      content = moviesTag;
    }

    return (
      <div>
        <header className="page-header">
          <h1>Ma vidéothèque <small>{movies.length} films</small> <a className="btn btn-success" to="/movies/new">Ajouter</a></h1>
        </header>
        <ul className="col-md-4 list-group">
          {content}
        </ul>
      </div>
    );
  }
});

module.exports = MovieList;
