import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../managers/moveManager";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieReviews } from "./MovieReviews";
import { ReviewForm } from "./review/ReviewForm";
import { getReviewsByMovieId } from "../../managers/reviewManager";
import { MovieTrailer } from "./MovieTrailer";

export const MovieDetail = ({ loggedInUser }) => {
 const [movie, setMovie] = useState();
 const [reviews, setReviews] = useState([]);
 const { id } = useParams();
 async function getData() {
  getMovieDetail(parseInt(id)).then(setMovie);
  getReviewsByMovieId(parseInt(id)).then(setReviews);
 }

 useEffect(() => {
  getData();
 }, []);

 if (movie == null) {
  return <p>Waiting</p>;
 }

 return (
  <div className="flex flex-col items-center mt-10">
   <MovieCard movie={movie} loggedInUser={loggedInUser} />
   <MovieTrailer movie={movie} />
   <ReviewForm movie={movie} loggedInUser={loggedInUser} getData={getData} />
   <MovieReviews
    reviews={reviews}
    movie={movie}
    loggedInUser={loggedInUser}
    getData={getData}
   />
  </div>
 );
};
