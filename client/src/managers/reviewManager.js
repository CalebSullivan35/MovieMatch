const _apiUrl = "/api/review";

export const getAllReviews = () => {
 return fetch(_apiUrl).then((res) => res.json());
};

export const getReviewsByMovieId = (id) => {
 return fetch(`${_apiUrl}/${id}/movie`).then((res) => res.json());
};

export const postNewReview = (reviewToPost) => {
 return fetch(_apiUrl, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(reviewToPost),
 }).then((res) => res.json());
};

export const deleteReview = (id) => {
 return fetch(`${_apiUrl}/${id}/delete`, {
  method: "Delete",
 });
};

export const getReviewById = (id) => {
 return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const getReviewByUserId = (userid) => {
 return fetch(`${_apiUrl}/${userid}/user`).then((res) => res.json());
};
export const updateReview = (review) => {
 return fetch(`${_apiUrl}/${review.Id}`, {
  method: "PUT",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(review),
 });
};
