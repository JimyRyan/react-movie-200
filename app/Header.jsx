var React = require('react');

var Link = require('react-router').Link;

var Header = React.createClass({
  render: function () {
    return (
      <header className="navbar navbar-default">
          <section className="container-fluid">
            <Link to={'/'} className="navbar-brand" activeClassName="active">ReactMovie</Link>
            <ul className="nav navbar-nav">
              <li><Link to={'/movies'} activeClassName="active">Mes films</Link></li>
            </ul>
          </section>
      </header>
    );
  }
});


module.exports = Header;
