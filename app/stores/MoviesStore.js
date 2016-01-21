var dispatcher = require('../dispatcher');
var actionTypes = require('../actions/actionTypes');
var EventEmitter = require('events').EventEmitter;
var MovieAPI = require('../api/MovieAPI');
var _ = require('lodash');


// Variable globale accessible uniquement depuis CE store
var state = {
    movies : []
}

var MoviesStore = _.assign({}, EventEmitter.prototype, {

    emitChange: function(state) {
        this.emit('change', state);
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    // GETTER du state
    getState: function() {
        return state;
    },

});

// Enregistrement du store auprès du dispatcher
// En fonction des actions, le store effectue les opérations ci-dessous :
dispatcher.register(function(action) {
    switch (action.actionType) {
        case actionTypes.FETCH_MOVIES:

            // Appel a l'API (async)
            MovieAPI.getMovieList()
                .then(function (response) {
                    // AJAX OK
                    // 1. Mise à jour des données du store
                    state.movies = response;

                    // 2. Envoie d'un event pour que l'IHM se mette à jour
                    MoviesStore.emitChange(state);
                }.bind(this))
                .catch(function (response) {
                    // AJAX KO
                    // Affiche l'erreur dans la console
                    console.log(response);
                });

            break;

        case actionTypes.GET_MOVIE:

            // Appel a l'API (async)
            MovieAPI.getMovie(action.data.id)
                .then(function (response) {
                    // AJAX OK
                    // 1. Mise à jour des données du store
                    state.movies = response;

                    // 2. Envoie d'un event pour que l'IHM se mette à jour
                    MoviesStore.emitChange(state);
                }.bind(this))
                .catch(function (response) {
                    // AJAX KO
                    // Affiche l'erreur dans la console
                    console.log(response);
                });

            break;

        case actionTypes.ADD_MOVIE:
            MovieAPI.addMovie(action.data);
            break;

        case actionTypes.UPDATE_MOVIE:
            MovieAPI.updateMovie(action.data);
            break;

        case actionTypes.DELETE_MOVIE:
            MovieAPI.removeMovie(action.data.id);
            break;

        // Obligatoire (a voir pourquoi...)
        //default:
        //    return true;
    }

})


module.exports = MoviesStore;
