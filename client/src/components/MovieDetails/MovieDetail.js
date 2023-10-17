import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../managers/moveManager";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

export const MovieDetail = () => {
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
  <>
   <MovieCard movie={movie} />
  </>
 );
};
