var React = require('react');
var MovieForm = require('./MovieForm.jsx');
var _ = require('lodash');
var MovieApi = require('../api/MovieAPI');
var MoviesStore = require('../stores/MoviesStore');
var MoviesActionCreator = require('../actions/MoviesActionCreator');

var Movie = React.createClass({
    getInitialState: function () {
        return {
            movie: {},
            id: this.props.params.id,
            dataLoaded: false,
            dataLoading: false,
            selected: false,
            editing : false
        }
    },

    // Lors de l'attachement du composant au DOM...
    componentWillMount: function () {

        // ... Il faut rajouter le listener
        MoviesStore.addChangeListener(this.onMovieChanged);
    },

    componentDidMount: function () {
        this.setState({
            dataLoaded : false,
            dataLoading: true
        });

        // Envoie de l'event qui demande la récupération des data du movi passé en param
        MoviesActionCreator.getMovie(this.state.id);
    },

    // Le handler appeler lors des modifications du store
    onMovieChanged: function(event) {
        this.setState({
            movie       : event.state.movie,
            dataLoading: false,
            dataLoaded: true
        })
    },

    onSelectMovie: function () {
        this.setState({
            selected: true
        });
    },

    onOpenEditionForm: function() {
        this.setState({
            editing: true
        });
    },

    closeEditionForm: function (event) {
        this.setState({
            editing: false
        });
    },

    onDeleteMovie: function() {
        // Demande la suppression du movie
        MoviesActionCreator.deleteMovie(this.state.movie.id);
    },

    onCancelModification: function (event) {
        event.preventDefault();
        this.closeEditionForm();
    },

    onMovieModification: function (newData) {
        var updatedMovie = _.merge(this.state.movie, newData);

        this.props.onMovieModification(updatedMovie);

        this.closeEditionForm();
    },

    //componentDidMount: function () {
       // this.fetchMovie();
    //},
/*
    componentDidUpdate: function (prevProps) {
        let oldId = prevProps.params.id;
        let newId = this.props.params.id;

        if (newId && oldId !== newId) {
            this.fetchMovie();
        }
    },
*/
    render: function () {

        // Movie en chargée
        if (!this.state.dataLoaded) {
            return (
                false
            );
        }

        // Movie en cours de chargement...
        if (this.state.dataLoading) {
            return (
              <div>Chargement des données...</div>
            );
        }

        // Movie chargé

        var movie               = this.state.movie,
            afficheUrl          = movie.poster || 'img/no-poster.jpg',
            content,
            actionButtons;

        if (this.state.selected) {
            actionButtons = (
                <div className="pull-right">
                    <button className="btn btn-default" onClick={this.onOpenEditionForm}><span className="glyphicon glyphicon-pencil"/></button>
                    <button className="btn btn-danger" onClick={this.onDeleteMovie}><i className="glyphicon glyphicon-trash"></i></button>
                </div>
            );
        } else {
            actionButtons = false;
        }

        if (this.state.editing) {
            content = <MovieForm edition={true}
                                 movie={this.state.movie}
                                 onCancel={this.onCancelModification}
                                 onMovieFormSaved={this.onMovieModification}
            />
        } else {
            content = (
                <div className="row" onClick={this.onSelectMovie}>
                    <img src={afficheUrl} className="col-md-3"/>
                    <div className="caption col-md-9">
                        <h3>{movie.title} {actionButtons} </h3>
                        <p><b>Année de sortie : </b>{movie.releaseYear}</p>
                        <p><b>Réalisateurs : </b>{movie.directors}</p>
                        <p><b>Acteurs : </b>{movie.actors}</p>
                        <p><b>Synopsis : </b>{movie.synopsis}</p>
                        <p><b>Vu le : </b>{movie.lastViewDate}</p>
                        <p><b>Prix : </b>{movie.price}</p>
                        <p><b>Note : </b>{movie.rate}</p>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }

});

module.exports = Movie;
