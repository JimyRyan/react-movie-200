var dispatcher = require('../dispatcher');
var actionTypes = require('./actionTypes');

module.exports = {

    fetchMovies : function () {

        dispatcher.dispatch({
            actionType : actionTypes.FETCH_MOVIES
        });

    },

    getMovie : function (id) {

        dispatcher.dispatch({
            actionType : actionTypes.GET_MOVIE,
            id: id
        });

    },

    addMovie : function(data) {

        dispatcher.dispatch({
            actionType : actionTypes.ADD_MOVIE,
            data: data

        });

    },

    updateMovie : function (data) {

        dispatcher.dispatch({
            actionType : actionTypes.UPDATE_MOVIE,
            data: data
        });

    },

    deleteMovie : function(id) {

        dispatcher.dispatch({
            actionType : actionTypes.DELETE_MOVIE,
            id : id
        });

    }

}
;
