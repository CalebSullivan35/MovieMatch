const _apiUrl = "/api/movie";

export const getPopularMovies = () => {
 return fetch(`${_apiUrl}/popular`).then((res) => res.json());
};

export const getTopRatedMovies = () => {
 return fetch(`${_apiUrl}/top-rated`).then((res) => res.json());
};

export const getLatestReleasedMovies = () => {
 return fetch(`${_apiUrl}/latest-release`).then((res) => res.json());
};

//get movie detail
export const getMovieDetail = (id) => {
 return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

//fetch based on string query
export const searchMovie = (query, page) => {
 return fetch(`${_apiUrl}/search?query=${query}&page=${page}`).then((res) =>
  res.json()
 );
};

//get movie videos
export const getMovieVideos = (movieId) => {
 return fetch(`${_apiUrl}/${movieId}/videos`).then((res) => res.json());
};

//get movie credits
export const getMovieCredits = (movieId) => {
 return fetch(`${_apiUrl}/${movieId}/credits`).then((res) => res.json());
};
