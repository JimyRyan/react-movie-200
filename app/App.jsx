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

var Header = require('./Header.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div>
                {/* Injection de la partie static : le header */}
                <Header />

                {/* Injection de la partie dynamique : le résultat qui varie en fct de la route => La home, la liste, ... */}
                {/* https://github.com/rackt/react-router/blob/v1.0.2/docs/API.md#route-components */}
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;

