var React = require('react');
var Link = require('react-router').Link;
var MoviesStore = require('../stores/MoviesStore');
var MoviesActionCreator = require('../actions/MoviesActionCreator');

var MovieList = React.createClass({
//    shouldComponentUpdate: function (nextProps) {
//        return this.props.children !== nextProps.children || this.props.searchKey !== nextProps.searchKey || this.props.movies !== nextProps.movies;
//    },


    // Initialisation des données
    getInitialState: function () {
        return {
            movies: [],
            keywords: "",
            loadingMovies: false
        };
    },

    // Ajout le listner lorsque le composant est ajouté du DOM
    componentWillMount: function () {

        // Listener pour le chargement des données async
        MoviesStore.addChangeListener(this.onShowMovies);

        // Loading...
        this.setState({
            loadingMovies: true
        });

        // Envoie de l'event qui demande la récupération des data depuis l'API (async)
        MoviesActionCreator.fetchMovies();
    },

    // Retire le listener lorsque le composant est supprimé du DOM
    componentWillUnmount: function () {

        MoviesStore.removeChangeListener(this.onShowMovies);
    },

    // Affichage des movies lorsque les données sont chargées
    onShowMovies: function (event) {
        this.setState({
            movies       : event.state.displayedMovies,
            keywords     : event.state.keywords,
            loadingMovies: event.state.loadingMovies
        })
    },

    onSearch: function (searchKey) {
        this.setState({
            searchKey: searchKey
        });
    },

    addMovie: function (movie) {
        var newMovie = {
            title   : movie.title,
            actors  : movie.actors,
            synopsis: movie.synopsis
        };

        MovieAPI.addMovie(newMovie).then(function (movie) {
            var newMovieList = this.state.movies.concat([movie]);

            this.setState({
                movies: newMovieList
            });
        }.bind(this));
    },

    render: function () {
        var movies = this.state.movies;
        var keywords = this.state.keywords;

        //var searchKey = this.props.searchKey;
        var moviesTag = movies.filter(function (movie) {
                return movie.title.toLowerCase().match(keywords.toLowerCase());
            })
            .map(function (movie) {
                return <li className="list-group-item" key={movie.id}><Link
                    to={'/movie/' + movie.id}>{movie.title}</Link></li>;
            }.bind(this));
        var content;

        if (this.state.loadingMovies) {
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
                    {/* Fiche d'1 movie OU Fiche d'ajout (cf. /App.jsx) */}
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = MovieList;
