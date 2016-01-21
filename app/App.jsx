var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.jsx');
var MovieList = require('./MovieList.jsx');
var SearchBar = require('./SearchBar.jsx');
var MovieAPI = require('./api/MovieAPI');
var MovieForm = require('./MovieForm.jsx');

var App = React.createClass({
    getInitialState: function () {
        return {
            movies       : [],
            loadingMovies: false,
            searchKey    : ''
        }
    },

    componentWillMount: function () {
        this.setState({
            loadingMovies: true
        });

        MovieAPI.getMovieList().then(function (movies) {
            this.setState({
                movies       : movies,
                loadingMovies: false
            })
        }.bind(this));
    },

    onMovieDeletion: function (movieId) {
        MovieAPI.removeMovie(movieId).then(function () {
            var filteredMovieList = this.state.movies.filter(function (movie) {
                return movie.id !== movieId;
            });

            this.setState({
                movies: filteredMovieList
            });
        }.bind(this));
    },

    onMovieAddition: function (data) { // data est un objet qui contient tous les champs d'un movie

        // res est une promise
        var res = MovieAPI.addMovie(data);

        res.then(function(addedMovie) {
            // Retour de l'appel à l'API OK (response 200)

            // ajout du nouveau movie
            // géré de façon immutable => création d'un nouvel objet
            var newMovieList = this.state.movies.concat(addedMovie);

            // Actualisation de l'état pour déclencher un nouveau render
            this.setState({
                movies: newMovieList
            });
        }.bind(this)) // Requis pour que le this.state fasse référence au context de l'App et non de la promise

    },

    onMovieModification: function (data) {

        // l'objet data doit etre également forwarder de facon a remplir les input
        console.log(data);

        // res est une promise
        var res = MovieAPI.updateMovie(data);

        res.then(function(updatedMovie) {
            // Retour de l'appel à l'API OK (response 200)

console.log(updatedMovie);
            // Actualisation de l'état pour déclencher un nouveau render
            this.setState({
            //    movies: newMovieList
            });
        }.bind(this)) // Requis pour que le this.state fasse référence au context de l'App et non de la promise

    },

    onSearch: function (searchKey) {
        this.setState({
            searchKey: searchKey
        });
    },

    render: function () {
        return (
            <div>
                <Header />
                <SearchBar onSearch={this.onSearch}/>
                <MovieForm onMovieFormSaved={this.onMovieAddition} />
                <MovieList
                    movies={this.state.movies}
                    searchKey={this.state.searchKey}
                    loadingMovies={this.state.loadingMovies}
                    onMovieModification={this.onMovieModification}
                    onMovieDeletion={this.onMovieDeletion} />
            </div>
        );
    }
});


ReactDOM.render(<App />, document.getElementById('main'));
