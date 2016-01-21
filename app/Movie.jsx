var React = require('react');

var Movie = React.createClass({

    propTypes: {
        // Récupération de la fonction de callback pour supprimer un Movie
        onMovieDeletion: React.PropTypes.func
    },

  render: function () {
    var film = this.props.film,
      afficheUrl = film.poster || 'img/no-poster.jpg';

    return (
      <li className="col-md-12">
        <img src={afficheUrl} className="col-md-2" />
        <div className="caption col-md-8 pull-left">
          <h3>{film.title}</h3>
          <p><b>Année de sortie : </b>{film.releaseYear}</p>
          <p><b>Réalisateurs : </b>{film.directors}</p>
          <p><b>Acteurs : </b>{film.actors}</p>
          <p><b>Synopsis : </b>{film.synopsis}</p>
          <p><b>Prix : </b>{film.price} €</p>
        </div>
        <div className="pull-right" onClick={this.props.onMovieDeletion.bind(null, film.id)}> // --> Appel de la fonction de callback. Le bind avec "null" est requis pour "simplement" appeler la fonction de callback avec le paramètre movie.id
          <button className="btn btn-danger"><i className="glyphicon glyphicon-trash"></i></button>
        </div>
      </li>
    );
  }
});

module.exports = Movie;
