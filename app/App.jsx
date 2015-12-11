var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.jsx');
var MovieList = require('./MovieList.jsx');
var SearchBar = require('./SearchBar.jsx');
var MovieForm = require('./MovieForm.jsx');

var MOVIES = [
  {
    id: 1,
    titre: 'AVATAR',
    afficheUrl: 'img/avatar.jpg',
    acteurs: 'Bruce Willis, Bruce Willis & Bruce Willis',
    synopsis: 'Il se passe des trucs dans ce film'
  },
  {
    id: 2,
    titre: 'REC',
    afficheUrl: 'img/rec.jpg',
    acteurs: "Des gens, et d'autres gens.",
    synopsis: 'Il se passe aussi des trucs dans ce film'
  }
];

var App = React.createClass({
  getInitialState: function () {
    return {
      movies: [],
      loadingMovies: false,
      searchKey: ''
    }
  },

  componentWillMount: function () {
    this.setState({
      loadingMovies: true
    });

    setTimeout(function (context) {
      context.setState({
        movies: MOVIES,
        loadingMovies: false
      });
    }, 1000, this);
  },

  onMovieDeletion: function (movieId) {
    var filteredMovieList = this.state.movies.filter(function (movie) {
      return movie.id !== movieId;
    });

    this.setState({
      movies: filteredMovieList
    });
  },

  onSearch: function (searchKey) {
    this.setState({
      searchKey: searchKey
    });
  },

  render: function () {
    return (
      <div>
        <Header />
        <SearchBar onSearch={this.onSearch} />
        <MovieForm />
        <MovieList
            movies={this.state.movies}
            searchKey={this.state.searchKey}
            loadingMovies={this.state.loadingMovies}
            onMovieDeletion={this.onMovieDeletion} />
      </div>
    );
  }
});


ReactDOM.render(<App />, document.getElementById('main'));
