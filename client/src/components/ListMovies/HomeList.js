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
   const results = await getFivePages();
   setSearchResults(results);
  } catch (error) {
   console.error("Error:", error);
  }
 };

 if (popularMovies.length < 1) {
  return <p>Loading....</p>;
 }
 return (
  <>
   <div className="flex flex-col  items-center ">
    <div className="input input-bordered input-primary flex flex-row p-5 items-center w-9/12 sm:w-5/12 text-2xl 2xl:text-3xl 2xl:h-16">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-5"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
     </svg>

     <input
      className="bg-inherit w-9/12"
      placeholder="Search For Movies"
      onChange={(e) => {
       handleSearch(e);
      }}
     />
    </div>

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
       <MovieCarousel
        movieList={latestReleasedMovies?.results}
        heading={"Latest Releases"}
       />
      </div>

      <div className="flex justify-start w-11/12 flex-col mt-10">
       <MovieCarousel movieList={popularMovies?.results} heading={"Trending"} />
      </div>

      <div className="flex justify-start w-11/12 flex-col mt-10">
       <MovieCarousel
        movieList={topRatedMovies?.results}
        heading={"All Time Top Rated"}
       />
      </div>
     </>
    )}
    {/* Add more content here */}
   </div>
  </>
 );
};
