const _apiUrl = "/api/UserProfileMovie";

export const getUserProfileMovieByUserId = (id) => {
 return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

//delete a UserProfileMovie
export const deleteUserProfileMovie = (id) => {
 return fetch(`${_apiUrl}/${id}/delete`, {
  method: "Delete",
 });
};

//post a UserProfileMovie
export const postUserProfileMovie = (UserProfileMovie) => {
 return fetch(_apiUrl, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(UserProfileMovie),
 }).then((res) => res.json());
};
