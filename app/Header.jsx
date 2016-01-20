var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <header className="col-md-12">
                <h2>ReactMovie</h2>
            </header>
        );
    }
});

// Rend dispo mon module lors de l'import du module par un autre fichier
module.exports = Header;