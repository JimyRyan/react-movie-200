var React = require('react');
var Link = require('react-router').Link;

var MovieForm = require('./MovieForm.jsx');
var _ = require('lodash');
var MovieAPI = require('./api/MovieAPI');




// Dans ce cas, le composant n'a plus connaissance des props (hormis celui des arguments passés par le routeur)
var Movie = React.createClass({
    getInitialState: function () {
        return {
            selected: false,
            editing : false,
            data    : {},
            dataLoaded : false,
            id      : this.props.params.id
        }
    },

    onSelect: function () {
        this.setState({
            selected: true
        });
    },


    // Load the initiale data movie if there is one ID
    /*
    componentWillMount: function() {
        if (this.state.id) {
            MovieAPI.getMovie(this.state.id).then(function (movie) {
                this.setState({
                    data: movie,
                    dataLoaded: true
                });
            }.bind(this));
        }
    },
    */

    componentDidUpdate: function (prevProps) {
        let oldId = prevProps.params.id;
        let newId = this.props.params.id;

        if (oldId !== newId) {
            // Call the API to fetch movie's data
            MovieAPI.getMovie().then(function (movie) {
                console.log(movie);
                this.setState({
                    data: movie
                });
            }.bind(this));
        }
    },


    openEditionForm: function () {
        this.setState({
            editing: true
        });
    },

    closeEditionForm: function (event) {
        this.setState({
            editing: false
        });
    },

    onCancelModification: function (event) {
        event.preventDefault();
        this.closeEditionForm();
    },

    onMovieModification: function (newData) {
        var updatedMovie = _.merge(this.props.film, newData);

        this.props.onMovieModification(updatedMovie);

        this.closeEditionForm();
    },

    render: function () {

        if (!this.state.dataLoaded) {
            return (
                <p>Chargement en cours...</p>
            )
        }

        console.log(this.state.dataLoaded);

        var film                = this.state.data,
            //onMovieModification = this.props.onMovieModification,
            afficheUrl          = film.poster || 'img/no-poster.jpg',
            content,
            actionButtons;

        // onClick={this.openEditionForm}
        // onClick={this.props.onMovieDeletion.bind(null, film.id)
        if (this.state.selected) {
            actionButtons = (
                <div className="pull-right">
                    <button className="btn btn-default" /* onClick={this.openEditionForm} */ ><span
                        className="glyphicon glyphicon-pencil"/></button>
                    <button className="btn btn-danger" /* onClick={this.props.onMovieDeletion.bind(null, film.id) */ ><i
                        className="glyphicon glyphicon-trash"></i></button>
                </div>
            );
        } else {
            actionButtons = false;
        }

        if (this.state.editing) {
            content = <MovieForm edition={true}
                                 movie={this.props.film}
                                 onCancel={this.onCancelModification}
                                 onMovieFormSaved={this.onMovieModification}/>
        } else {
            var movieLink = '/movie/' + film.id;
            content = (
                <div className="row">
                    <Link to={movieLink}><img src={afficheUrl} className="col-md-3"/></Link>
                    <div className="caption col-md-9">
                        <Link to={movieLink}><h3>{film.title} {actionButtons} </h3></Link>
                        <p><b>Année de sortie : </b>{film.releaseYear}</p>
                        <p><b>Réalisateurs : </b>{film.directors}</p>
                        <p><b>Acteurs : </b>{film.actors}</p>
                        <p><b>Synopsis : </b>{film.synopsis}</p>
                        <p><b>Vu le : </b>{film.lastViewDate}</p>
                        <p><b>Prix : </b>{film.price}</p>
                        <p><b>Note : </b>{film.rate}</p>
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
