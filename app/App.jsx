var React = require('react');
var ReactDOM = require('react-dom');

// Chemin relatif depuis le dossier app
var Header = require('./Header.jsx');
var MovieList = require('./MovieList.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />

        <MovieList />
      </div>
    );
  }
});

// A appeler une seule fois dans toute l'application
// C'est le bootstrap (cf. ng-app d'AngularJS)
ReactDOM.render(<App />, document.getElementById('main'));
