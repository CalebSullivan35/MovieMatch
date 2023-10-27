import { useEffect, useState } from "react";
import {
 getLatestReleasedMovies,
 getPopularMovies,
 getTopRatedMovies,
 searchMovie,
} from "../../managers/moveManager";
import { useNavigate } from "react-router-dom";
import { MovieCarousel } from "./MovieCarousel";

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

 async function getFivePages() {
  const allMovies = [];

  for (let page = 1; page <= 3; page++) {
   const pageData = await searchMovie(searchTerms, page);
   if (pageData.results && Array.isArray(pageData.results)) {
    allMovies.push(...pageData.results);
   }
  }

  return allMovies;
 }

 const handleSearch = async (e) => {
  setSearchTerms(e.target.value);
  if (searchTerms === "") {
   setSearchResults(undefined);
  }
  try {
   // Perform the search using the searchMovie function
   const results = await getFivePages();

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
      {searchResults?.map((sr) =>
       sr.original_language === "en" && sr.poster_path !== null ? (
        <img
         className="p-1 rounded-xl w-2/12"
         key={sr.id}
         src={`http://image.tmdb.org/t/p/w500/${sr.poster_path}`}
         alt="missing"
         onClick={() => {
          navigate(`movie/${sr.id}`);
         }}
        />
       ) : (
        ""
       )
      )}
     </div>
    ) : (
     <>
      <div className="flex justify-start w-11/12 flex-col mt-5">
       <h1 className="text-4xl ">Latest Releases</h1>
       <MovieCarousel movieList={latestReleasedMovies?.results} />
      </div>

      <div className="flex justify-start w-11/12 flex-col mt-10">
       <h1 className="text-4xl ">Trending </h1>
       <MovieCarousel movieList={popularMovies?.results} />
      </div>

      <div className="flex justify-start w-11/12 flex-col mt-10">
       <h1 className="text-4xl">All Time Top Rated</h1>
       <MovieCarousel movieList={topRatedMovies?.results} />
      </div>
     </>
    )}
    {/* Add more content here */}
   </div>
  </>
 );
};
