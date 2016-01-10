var React = require('react');
var MovieForm = require('./MovieForm.jsx');
var _ = require('lodash');

var Movie = React.createClass({
  getInitialState: function () {
    return {
      selected: false,
      editing: false
    }
  },

  onSelect: function () {
    this.setState({
      selected: true
    });
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
    var film = this.props.film,
      onMovieModification = this.props.onMovieModification,
      afficheUrl = film.poster || 'img/no-poster.jpg',
      content,
      actionButtons;

    if (this.state.selected) {
      actionButtons = (
        <div className="pull-right">
          <button className="btn btn-default" onClick={this.openEditionForm}><span className="glyphicon glyphicon-pencil"/></button>
          <button className="btn btn-danger" onClick={this.props.onMovieDeletion.bind(null, film.id)}><i className="glyphicon glyphicon-trash"></i></button>
        </div>
      );
    } else {
      actionButtons = false;
    }

    if (this.state.editing) {
      content = <MovieForm edition={true}
                          movie={this.props.film}
                          onCancel={this.onCancelModification}
                          onMovieFormSaved={this.onMovieModification} />
    } else {
      content = (
        <div className="row">
          <img src={afficheUrl} className="col-md-3" />
          <div className="caption col-md-9">
            <h3>{film.title} {actionButtons} </h3>
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
