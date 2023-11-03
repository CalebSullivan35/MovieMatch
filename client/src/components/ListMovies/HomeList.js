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
 const [popularMovies, setPopularMovies] = useState([]);
 const [topRatedMovies, setTopRatedMovies] = useState([]);
 const [latestReleasedMovies, setlatestReleasedMovies] = useState([]);
 const [searchTerms, setSearchTerms] = useState("");
 const [searchResults, setSearchResults] = useState(undefined);
 const [hoveredMovie, setHoveredMovie] = useState(null);

 const navigate = useNavigate();
 async function getData() {
  getPopularMovies().then(setPopularMovies);
  getLatestReleasedMovies().then(setlatestReleasedMovies);
  getTopRatedMovies().then(setTopRatedMovies);
 }
 // initial use effect to get data
 useEffect(() => {
  getData();
 }, []);
 //function that will fetch five pages worth of data. Since limited to 1 page per fetch.
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
 //logic to handle the search bar
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
   <div className="flex flex-col items-center ">
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
     <div className="w-full flex flex-col  items-center">
      <h1 className="mt-10 text-left text-2xl font-medium xl:text-5xl w-11/12 border-b-2 text-primary border-primary">
       SEARCH RESULTS FOR: {searchTerms}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 md:mx-10 xl:grid-cols-4 2xl:grid-cols-5 mb-5 w-11/12 mt-5">
       {searchResults?.map((sr) =>
        //make sure its english anda poster image exists
        sr.original_language === "en" && sr.poster_path !== null ? (
         <div
          className="relative carousel-item flex flex-col"
          key={sr.id}
          onMouseEnter={() => setHoveredMovie(sr)}
          onMouseLeave={() => setHoveredMovie(null)}
         >
          <img
           className="rounded-2xl m-2"
           key={sr.id}
           src={`http://image.tmdb.org/t/p/w500/${sr.poster_path}`}
           alt="missing"
           onClick={() => {
            navigate(`movie/${sr.id}`);
           }}
          />
          {hoveredMovie && hoveredMovie.id === sr.id && (
           <div
            className="rounded-2xl m-2 absolute inset-0 text-white  hover:cursor-pointer custom-transition text-center text-2xl flex justify-center items-center flex-col"
            onClick={() => {
             navigate(`movie/${sr.id}`);
            }}
           >
            <p className="text-4xl text-center custom-transition-text">
             {sr.title}
            </p>
            <p className="custom-transition-text text-center mt-10">
             {sr.release_date}
            </p>
            <span className="mr-2 text-center custom-transition-text">
             <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              className="inline mb-3"
             >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
             </svg>
             {sr.vote_average.toString().slice(0, 3)}/10
            </span>
           </div>
          )}
         </div>
        ) : (
         ""
        )
       )}
      </div>
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
