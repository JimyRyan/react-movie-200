var dispatcher = require('../dispatcher');
var actionTypes = require('../actions/actionTypes');
var EventEmitter = require('events').EventEmitter;
var MovieAPI = require('../api/MovieAPI');
var _ = require('lodash');

// Variable globale accessible uniquement depuis CE store
var state = {
    movies: [],
    displayedMovies: [],
    keywords: "",
    movie: {}
}

var MoviesStore = _.assign({}, EventEmitter.prototype, {

    emitChange: function (state) {
        this.emit('change', {state: state});
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },

    // GETTER du state
//    getState: function () {
//        return state;
//    }

});

// Enregistrement du store auprès du dispatcher
// En fonction des actions, le store effectue les opérations ci-dessous :
dispatcher.register(function (action) {
    switch (action.actionType) {
        case actionTypes.FETCH_MOVIES:

            // Appel a l'API (async)
            MovieAPI.getMovieList()
                .then(function (response) {
                    // AJAX OK
                    // 1. Mise à jour des données du store

                    state.movies = response;

                    // 2. Composition de l'objet "event"

                    var newState = _.merge(state, {movies: response, displayedMovies: response})

                    // 3. Envoie d'un event pour que l'IHM se mette à jour
                    MoviesStore.emitChange(newState);
                }.bind(this))
                .catch(function (response) {
                    // AJAX KO
                    // Affiche l'erreur dans la console
                    console.log(response);
                });

            break;

        case actionTypes.GET_MOVIE:

            // Appel a l'API (async)
            MovieAPI.getMovie(action.id)
                .then(function (response) {
                    // AJAX OK
                    // 1. Mise à jour des données du store

                    state.movie = response

                    var newState = _.merge(state, {movie: response})


                    // 2. Envoie d'un event pour que l'IHM se mette à jour
                    MoviesStore.emitChange(newState);
                }.bind(this))
                .catch(function (response) {
                    // AJAX KO
                    // Affiche l'erreur dans la console
                    console.log(response);
                });

            break;

        case actionTypes.SEARCH_MOVIE:

            var displayedMovies = _.filter(state.movies, function (movie) {
                var title = movie.title || '';
                return title.toLowerCase().match(action.keywords.toLowerCase());
            });

            var newState = _.merge(state, {keywords: action.keywords, displayedMovies: displayedMovies})

            MoviesStore.emitChange(newState);

            break;

        case actionTypes.ADD_MOVIE:
            MovieAPI.addMovie(action.data)
                .then(function(response) {

                    // Rajout du film...
                    var newMovies = state.movies.concat([response]);

                    state.movies = newMovies;

                    var newState = _.merge(state, {movies: newMovies, displayedMovies: newMovies});

                    // rafraichissement de l'UI
                    MoviesStore.emitChange(newState);

                }.bind(this))
                .catch(function (response) {
                    // AJAX KO
                    // Affiche l'erreur dans la console
                    console.log(response);
                });
            break;

        case actionTypes.UPDATE_MOVIE:
            MovieAPI.updateMovie(action.data);
            break;

        case actionTypes.DELETE_MOVIE:
            MovieAPI.removeMovie(action.id)
                .then(function(response) {
                    // Création d'un nouveau tableau de movie exempt de celui qui vient d'être delete

                    var newMovies = state.movies.filter(function (movie) {
                        return movie.id !== action.id;
                    });

                    state.movies = newMovies;

                    var newState = _.merge(state, {movies: newMovies, displayedMovies: newMovies})
                    MoviesStore.emitChange(newState);

                }.bind(this))
                .catch(function (response) {
                    // AJAX KO
                    // Affiche l'erreur dans la console
                    console.log(response);
                });

            break;

        // Obligatoire (a voir pourquoi...)
        //default:
        //    return true;
    }

})


module.exports = MoviesStore;