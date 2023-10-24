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
export const searchMovie = (query) => {
 return fetch(`${_apiUrl}/search?query=${query}`).then((res) => res.json());
};
