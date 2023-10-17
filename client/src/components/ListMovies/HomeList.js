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
   <div className="flex flex-col w-screen max-h-screen items-center">
    <div className="flex justify-start w-11/12">
     <h1 className="text-4xl mb-5">Latest Releases</h1>
    </div>
    <div className="flex mb-5 w-11/12 overflow-x-auto">
     {latestReleasedMovies.results?.map((pm) => (
      <img
       src={`http://image.tmdb.org/t/p/w185/${pm.poster_path}`}
       onClick={() => {
        navigate(`movie/${pm.id}`);
       }}
      ></img>
     ))}
    </div>
    <div className="flex justify-start w-11/12">
     <h1 className="text-4xl mb-5">Trending </h1>
    </div>
    <div className="flex mb-5 w-11/12 overflow-x-auto">
     {popularMovies.results?.map((pm) => (
      <img
       src={`http://image.tmdb.org/t/p/w185/${pm.poster_path}`}
       onClick={() => {
        navigate(`movie/${pm.id}`);
       }}
      ></img>
     ))}
    </div>
    <div className="flex justify-start w-11/12">
     <h1 className="text-4xl mb-5">All Time Top Rated</h1>
    </div>
    <div className="flex mb-5 w-11/12 overflow-x-auto">
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
