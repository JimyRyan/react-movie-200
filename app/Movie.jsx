var React = require('react');

var Movie = React.createClass({
    /* Doc sur les propTypes :: https://facebook.github.io/react/docs/reusable-components.html#prop-validation */
    propTypes: {
        data: React.PropTypes.shape({
            poster: React.PropTypes.string,
            title: React.PropTypes.string.isRequired,
            actors: React.PropTypes.string.isRequired,
            synopsis: React.PropTypes.string.isRequired
        }).isRequired
    },
    getDefaultProps: function() {
        return {
            data: {
                poster: 'img/no-poster.jpg'
            }
        };
    },
    render: function () {

        /* raccourci pour faciliter les manipulation dans le TPL */
        var data = this.props.data;

        return (
            <li className="col-md-12 row">
                <img src={data.poster} className="col-md-2" />
                <div className="caption">
                    <h3>{data.title}</h3>
                    <p><b>Acteurs : </b>{data.actors}</p>
                    <p><b>Synopsis : </b>{data.synopsis}</p>
                </div>
            </li>
        );
    }
});

module.exports = Movie;