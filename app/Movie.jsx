var React = require('react');

var Movie = React.createClass({

    getInitialState: function () {
        return {
            btnDisplayed: false
        }
    },

    onSelect: function() {
        this.setState({btnDisplayed: !this.state.btnDisplayed});
    },

  render: function () {

      var film = this.props.film,
          afficheUrl = film.poster || 'img/no-poster.jpg';

      // Le bouton de suppression d'un film
      var actionBtn = false; // Ne rien rendre (doit être false)
      if (this.state.btnDisplayed) {
          // Si on souhait afficher le bouton, on place le HTML
          actionBtn =  (
              <div className="pull-right">
                <button className="btn btn-danger" onClick={this.props.onMovieDeletion.bind(null, film.id)}><i className="glyphicon glyphicon-trash"></i></button>
            </div>
          );
      }

    return (
      <li className="col-md-12" onClick={this.onSelect}>
        <img src={afficheUrl} className="col-md-2" />
        <div className="caption col-md-8 pull-left">
          <h3>{film.title}</h3>
          <p><b>Année de sortie : </b>{film.releaseYear}</p>
          <p><b>Réalisateurs : </b>{film.directors}</p>
          <p><b>Acteurs : </b>{film.actors}</p>
          <p><b>Synopsis : </b>{film.synopsis}</p>
        </div>
          {/* Affichage ou non du bouton */}
          {actionBtn}
      </li>
    );
  }
});


module.exports = Movie;
