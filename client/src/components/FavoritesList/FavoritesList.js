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
  <div className="h-screen">
   <h1 className="text-center mb-10 text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold">
    Favorites List
   </h1>
   <div className="flex flex-col  items-center text-xl sm:text-xl md:text-xl xl:text-2xl">
    <label for="years" class="mb-6 font-medium">
     Sort By Genre
    </label>
    <select
     className="w-fit select select-accent text-xl sm:text-xl md:text-2xl xl:text-4xl"
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
        className="btn-circle btn-error btn-sm sm:btn-md btn absolute bottom-0 left-0"
        onClick={() => {
         handleDeleteButton(f.id);
        }}
       >
        <GrSubtractCircle
         className=" 
        text-3xl sm:text-4xl"
        />
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};
