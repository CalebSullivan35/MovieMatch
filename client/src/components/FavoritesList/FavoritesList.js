import { useEffect, useState } from "react";
import {
 deleteUserProfileMovie,
 getUserProfileMovieByUserId,
} from "../../managers/userProfileMovieManager";
import { useNavigate } from "react-router-dom";
import { GrSubtractCircle } from "react-icons/gr";

export const FavoritesList = ({ loggedInUser }) => {
 const [myFavorites, setMyFavorites] = useState([]);
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

 if (myFavorites.length < 1) {
  return "";
 }

 return (
  <div className="w-screen h-screen">
   <h1>Favorites: </h1>
   <div className="flex flex-row p-5 m-5">
    {myFavorites.map((f) => {
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
