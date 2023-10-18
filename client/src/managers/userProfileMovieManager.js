const _apiUrl = "/api/UserProfileMovie";

export const getUserProfileMovieByUserId = (id) => {
 return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};
