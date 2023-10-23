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
   <h1>Favorites: </h1>
   <div className="flex w-11/12 justify-end">
    <select
     className="select w-full max-w-xs select-accent"
     onChange={(e) => {
      handleDropDownChanges(e);
     }}
    >
     <option disabled selected>
      Select Genre
     </option>
     <option value="None">Do Not Filter By Genere</option>
     {genres.map((g) => {
      return <option value={g}>{g}</option>;
     })}
    </select>
   </div>
   <div className="flex flex-row p-5 m-5">
    {moviesToDisplay.map((f) => {
     return (
      <div className=" relative">
       <img
        className="p-5"
        src={`http://image.tmdb.org/t/p/w185/${f.movie.posterPath}`}
        onClick={() => {
         navigate(`/movie/${f.movie.id}`);
        }}
       ></img>
       <button
        className="btn-circle btn-warning btn absolute bottom-0 left-0"
        onClick={() => {
         handleDeleteButton(f.id);
        }}
       >
        <GrSubtractCircle className="text-4xl" />
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};
