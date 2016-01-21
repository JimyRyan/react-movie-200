// /!\ Dans la conf par défaut de webpack.config.js, le point d'entré est le fichier App.jsx
/* Il faut adapter la config suivante :
 *
 * [...]
 * module.exports = {
 * devtool: 'eval-source-map',
 *   entry: [
 *   'webpack/hot/dev-server',
 *   'webpack-dev-server/client?http://localhost:8080',
 *   path.resolve(__dirname, 'app/App.jsx')
 * ],
 * [...]
 *
 * EN
 *
 * [...]
 * module.exports = {
 * devtool: 'eval-source-map',
 *   entry: [
 *   'webpack/hot/dev-server',
 *   'webpack-dev-server/client?http://localhost:8080',
 *   path.resolve(__dirname, 'app/Router.jsx')
 * ],
 * [...]
 */


var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./App.jsx');
var Home = require('./Home.jsx');
var ReactMovie = require('./ReactMovie.jsx');
var Movie = require('./Movie.jsx');
var MovieForm = require('./MovieForm.jsx');

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="home" component={Home}/>
            <Route path="movies" component={ReactMovie}>
                <Route path="/movie/:id" component={Movie}/>
                <Route path="movie/new" component={MovieForm}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('main'))