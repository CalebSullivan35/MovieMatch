import { useEffect, useState } from "react";
import {
 deleteUserProfileMovie,
 getUserProfileMovieByUserId,
 postUserProfileMovie,
} from "../../managers/userProfileMovieManager";

export const MovieCard = ({ movie, loggedInUser }) => {
 //we need to make sure that the current movie isnt in a relationship with the logged in user.
 //first get all the relationships by the user.
 const [myRelationships, setmyRelationships] = useState([]);
 function getData() {
  getUserProfileMovieByUserId(loggedInUser.id).then(setmyRelationships);
 }

 useEffect(() => {
  getData();
 }, []);

 //button to post a new relationship
 const handleAddButton = () => {
  //declare a new relationship
  const newRelationship = {
   matchingMovieInteger: movie.id,
   userProfileId: loggedInUser.id,
  };
  //send new relationship to api
  postUserProfileMovie(newRelationship).then(() => getData());
 };

 //handles delete button
 function handleDeleteButton() {
  const matchingRelationship = myRelationships.find(
   (r) => r.matchingMovieInteger === movie.id
  );
  deleteUserProfileMovie(matchingRelationship.id).then(getData());
 }

 const handleButtonToShow = () => {
  if (myRelationships.some((r) => r.matchingMovieInteger === movie.id)) {
   return (
    <button
     className="btn btn-primary"
     onClick={() => {
      handleDeleteButton();
     }}
    >
     -
    </button>
   );
  } else {
   return (
    <button
     className="btn btn-primary"
     onClick={() => {
      handleAddButton();
     }}
    >
     +
    </button>
   );
  }
 };

 return (
  <div className="flex bg-base-300 shadow-xl w-7/12 lg:h-96 rounded-lg">
   <figure className="w-1/6">
    <img
     className="h-full w-full"
     src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
     alt="Album"
    />
   </figure>
   <div className="px-2 mt-5 ml-5 w-5/6">
    <h2 className="card-title"></h2>
    <h1 className="text-4xl text-center">{movie.title}</h1>
    <p>{movie.overview}</p>
    <p>{movie.release_date}</p>
    <p>Movie Length: {movie.runtime} minutes</p>
    <div className="flex items-baseline">
     <h2 className="text-xl">Genres: </h2>
     {movie.genres.map((g) => {
      return <span className="px-1">{g.name} </span>;
     })}
    </div>
    <div className="float-right">{handleButtonToShow()}</div>
   </div>
  </div>
 );
};
