var React = require('react');
var Link = require('react-router').Link;
var MoviesStore = require('../stores/MoviesStore');
var MoviesActionCreator = require('../actions/MoviesActionCreator');

var MovieList = React.createClass({
//    shouldComponentUpdate: function (nextProps) {
//        return this.props.children !== nextProps.children || this.props.searchKey !== nextProps.searchKey || this.props.movies !== nextProps.movies;
//    },


    // Init the data
    getInitialState: function () {
        return {movies: []};
    },

    // Listener pour le chargement des data async
    // Ajout le listner lorsque le composant est ajouté du DOM
    componentWillMount: function () {

        MoviesStore.addChangeListener(this.onShowMovies);

        // Envoie de l'event qui demande la récupération des data depuis l'API (async)
        MoviesActionCreator.fetchMovies();
    },

    // Retire le listener lorsque le composant est supprimé du DOM
    componentWillUnmount: function () {

        MoviesStore.removeChangeListener(this.onShowMovies);

        // Envoie de l'event qui demande la récupération des data depuis l'API (async)
        //MoviesActionCreator.fetchMovies();
    },

    onShowMovies: function () {
        this.setState({
            movies       : MoviesStore.getState().movies,
            loadingMovies: false
        })
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
                return <li className="list-group-item" key={movie.id}><Link
                    to={'/movie/' + movie.id}>{movie.title}</Link></li>;
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
                    <h1>Ma vidéothèque
                        <small>{movies.length} films</small>
                        <Link to="/movie/new" className="btn btn-success">Ajouter</Link></h1>
                </header>
                <ul className="col-md-4 list-group">
                    {content}
                </ul>
                <div className="col-md-8">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = MovieList;
