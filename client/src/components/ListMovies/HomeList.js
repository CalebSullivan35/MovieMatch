import { useEffect, useState } from "react";
import {
 getLatestReleasedMovies,
 getPopularMovies,
 getTopRatedMovies,
 searchMovie,
} from "../../managers/moveManager";
import { useNavigate } from "react-router-dom";

export const HomeList = () => {
 //store all the movies in state.
 const [popularMovies, setPopularMovies] = useState([]);
 const [topRatedMovies, setTopRatedMovies] = useState([]);
 const [latestReleasedMovies, setlatestReleasedMovies] = useState([]);
 const [searchTerms, setSearchTerms] = useState("");
 const [searchResults, setSearchResults] = useState(undefined);
 const navigate = useNavigate();
 async function getData() {
  getPopularMovies().then(setPopularMovies);
  getLatestReleasedMovies().then(setlatestReleasedMovies);
  getTopRatedMovies().then(setTopRatedMovies);
 }

 useEffect(() => {
  getData();
 }, []);

 const handleSearch = async (e) => {
  setSearchTerms(e.target.value);
  if (searchTerms === "") {
   setSearchResults(undefined);
  }
  try {
   // Perform the search using the searchMovie function
   const results = await searchMovie(searchTerms);

   // Update the state with the search results
   setSearchResults(results);

   // Log the search results
   console.log(results);
  } catch (error) {
   // Handle any errors that occur during the search
   console.error("Error:", error);
  }
 };

 if (popularMovies.length < 1) {
  return <p>Loading....</p>;
 }
 return (
  <>
   <div className="flex flex-col  items-center">
    <input
     type="text"
     placeholder="Search for movies!"
     className="input input-bordered input-accent w-full max-w-xs"
     onChange={(e) => {
      handleSearch(e);
     }}
    />

    {searchTerms != "" ? (
     <div className="flex mb-5 w-11/12 flex-wrap mt-10">
      {searchResults?.results?.map((sr) => (
       <img
        className="p-1 rounded-xl w-2/12"
        key={sr.id}
        src={`http://image.tmdb.org/t/p/w500/${sr.poster_path}`}
        alt="missing"
        onClick={() => {
         navigate(`movie/${sr.id}`);
        }}
       />
      ))}
     </div>
    ) : (
     <>
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
        />
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
        />
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
        />
       ))}
      </div>
     </>
    )}
    {/* Add more content here */}
   </div>
  </>
 );
};
