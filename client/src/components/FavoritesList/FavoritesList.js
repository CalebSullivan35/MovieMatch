import { useEffect, useState } from "react";
import {
 deleteUserProfileMovie,
 getUserProfileMovieByUserId,
} from "../../managers/userProfileMovieManager";
import { useNavigate } from "react-router-dom";
import { GrSubtractCircle } from "react-icons/gr";

export const FavoritesList = ({ loggedInUser }) => {
 const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
 ];
 const [myFavorites, setMyFavorites] = useState([]);
 const [selectedGenre, setSelectedGenre] = useState(null);
 const [moviesToDisplay, setMoviesToDisplay] = useState([]);

 const navigate = useNavigate();
 function getData() {
  getUserProfileMovieByUserId(loggedInUser.id).then(setMyFavorites);
 }
 function handleDeleteButton(id) {
  deleteUserProfileMovie(id).then(() => getData());
 }
 useEffect(() => {
  getData();
 }, []);
 //useEffect to intially set movies to display as all favorites.
 useEffect(() => {
  setMoviesToDisplay(myFavorites);
 }, [myFavorites]);

 //function that will set state dependending on dropdown
 async function handleDropDownChanges(e) {
  //first case will be that if the value ever goes back to none then set it to default list.
  if (e.target.value == "None") {
   setMoviesToDisplay(myFavorites);
   return;
  }
  setMoviesToDisplay(
   myFavorites.filter((f) => {
    return f.movie.genres.some((genre) => genre.name === e.target.value);
   })
  );
 }

 if (myFavorites.length < 1) {
  return "";
 }

 return (
  <div className="h-screen flex flex-col">
   <div className="mt-10 flex flex-row w-full md:justify-between justify-center px-20">
    <h1 class="hidden md:flex md:visible md:text-4xl xl:text-6xl font-bold h-full items-end">
     Favorites List
    </h1>

    <div className="flex flex-col items-center text-xl sm:text-xl md:text-xl xl:text-2xl">
     <select
      className="
      select select-accent text-xl sm:text-xl md:text-2xl xl:text-4xl"
      onChange={(e) => {
       handleDropDownChanges(e);
      }}
     >
      <option disabled selected>
       Select Genre
      </option>
      <option value="None">Do Not Filter By Genre</option>

      {genres.map((g) => {
       return <option value={g}>{g}</option>;
      })}
     </select>
    </div>
   </div>
   <div className="grid grid-cols-2 md:grid-cols-3 md:mx-10 xl:grid-cols-4 2xl:grid-cols-5">
    {moviesToDisplay.map((f) => {
     return (
      <div className="relative p-5">
       <img
        className="rounded-2xl"
        src={`http://image.tmdb.org/t/p/w500/${f.movie.posterPath}`}
        onClick={() => {
         navigate(`/movie/${f.movie.id}`);
        }}
       ></img>
       <button
        className="btn-sq btn-secondary btn-sm sm:btn-md btn absolute top-1 right-1 rounded-2xl hover:btn-error"
        onClick={() => {
         handleDeleteButton(f.id);
        }}
       >
        <svg
         viewBox="0 0 24 24"
         fill="currentColor"
         height="1.5em"
         width="1.5em"
        >
         <path fill="none" d="M0 0h24v24H0z" />
         <path d="M7 6V3a1 1 0 011-1h8a1 1 0 011 1v3h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5zm6.414 8l1.768-1.768-1.414-1.414L12 12.586l-1.768-1.768-1.414 1.414L10.586 14l-1.768 1.768 1.414 1.414L12 15.414l1.768 1.768 1.414-1.414L13.414 14zM9 4v2h6V4H9z" />
        </svg>
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};
