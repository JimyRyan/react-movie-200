var axios = require('axios');

function getMovieList () {
  return axios.get('/server/api/movies')
            .then(function (response) { return response.data; });
}

function addMovie (data) {
  return axios.post('/server/api/movies', data)
      .then(function (response) { return response.data; });
}

function updateMovie (data) {
  return axios.put('/server/api/movies/' + data.id, data)
      .then(function (response) { return response.data; });
}

function removeMovie (id) {
  return axios.delete('/server/api/movies/' + id);
}

module.exports = {
  getMovieList: getMovieList,
  addMovie: addMovie,
  updateMovie: updateMovie,
  removeMovie: removeMovie
};
