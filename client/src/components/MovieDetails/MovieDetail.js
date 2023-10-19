import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../managers/moveManager";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

export const MovieDetail = ({ loggedInUser }) => {
 const [movie, setMovie] = useState();
 const { id } = useParams();
 async function getData() {
  getMovieDetail(parseInt(id)).then(setMovie);
 }

 useEffect(() => {
  getData();
 }, []);

 if (movie == null) {
  return <p>Waiting</p>;
 }

 return (
  <div className="w-screen h-screen flex justify-center">
   <MovieCard movie={movie} loggedInUser={loggedInUser} />
  </div>
 );
};
