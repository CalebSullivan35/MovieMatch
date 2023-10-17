import { useEffect, useState } from "react";
import {
 getLatestReleasedMovies,
 getPopularMovies,
 getTopRatedMovies,
} from "../../managers/moveManager";
import { useNavigate } from "react-router-dom";

export const HomeList = () => {
 //store all the movies in state.
 const [popularMovies, setPopularMovies] = useState([]);
 const [topRatedMovies, setTopRatedMovies] = useState([]);
 const [latestReleasedMovies, setlatestReleasedMovies] = useState([]);
 const navigate = useNavigate();
 async function getData() {
  getPopularMovies().then(setPopularMovies);
  getLatestReleasedMovies().then(setlatestReleasedMovies);
  getTopRatedMovies().then(setTopRatedMovies);
 }

 useEffect(() => {
  getData();
 }, []);

 if (popularMovies.length < 1) {
  return <p>Loading....</p>;
 }
 return (
  <>
   <div className="flex flex-col w-screen max-h-screen">
    <div className="flex flex-row justify-center mb-5 w-11/12 ">
     {latestReleasedMovies.results?.map((pm) => (
      <img
       src={`http://image.tmdb.org/t/p/w185/${pm.poster_path}`}
       onClick={() => {
        navigate(`movie/${pm.id}`);
       }}
      ></img>
     ))}
    </div>
    <div className="flex flex-row justify-center mb-5 w-11/12 max-h-48 overflow-x-auto overflow-y-hidden bg-black">
     {popularMovies.results?.map((pm) => (
      <img
       src={`http://image.tmdb.org/t/p/w185/${pm.poster_path}`}
       onClick={() => {
        navigate(`movie/${pm.id}`);
       }}
      ></img>
     ))}
    </div>
    <div className="flex flex-row mb-5">
     {topRatedMovies.results?.map((pm) => (
      <img
       src={`http://image.tmdb.org/t/p/w185/${pm.poster_path}`}
       onClick={() => {
        navigate(`movie/${pm.id}`);
       }}
      ></img>
     ))}
    </div>
   </div>
  </>
 );
};
