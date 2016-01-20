var axios = require('axios');

function getMovieList (cb) {
  return axios.get('/server/api/movies')
            .then(function (response) { return response.data; });
}

function deleteMovie (id) {
    return axios.delete('/server/api/movies/' + id)
        .then(function (response) { return response; });
}

module.exports = {
  getMovieList: getMovieList,
    deleteMovie: deleteMovie
};
