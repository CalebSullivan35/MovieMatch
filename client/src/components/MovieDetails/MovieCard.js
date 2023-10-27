import { useEffect, useState } from "react";
import {
 deleteUserProfileMovie,
 getUserProfileMovieByUserId,
 postUserProfileMovie,
} from "../../managers/userProfileMovieManager";
import { ActorsList } from "./ActorsList";

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
     className="btn btn-secondary text-xs"
     onClick={() => {
      handleDeleteButton();
     }}
    >
     Remove From Favorites
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
     Add To Favorites
    </button>
   );
  }
 };

 return (
  <div className="mt-5 shadow-xl w-full rounded-lg md:flex md:flex-row md:w-9/12 2xl:w-7/12">
   <div className="md:w-1/3 ">
    <img
     src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
     alt="Album"
     className="w-full h-96 md:h-full md:w-full"
    />
   </div>
   <div className=" flex items-center px-2 mt-5 ml-5 w-full md:w-2/3 flex-col relative">
    <h1 className="text-4xl text-center font-bold">{movie.title}</h1>
    <h2 className="text-xl text-center italic mb-5">{movie.tagline}</h2>
    <p className="mb-5">{movie.overview}</p>
    <div className="collapse collapse-arrow bg-base-200 2xl:w-2/3">
     <input type="checkbox" />
     <div className="collapse-title text-xl font-medium text-center">
      Details
     </div>
     <div className="collapse-content">
      <p>
       <span className="text-xl">Rating:</span>{" "}
       {movie.vote_average.toString().slice(0, 3)}/10
      </p>
      <p>
       <span className="text-xl">Released:</span> {movie.release_date}
      </p>
      <p>
       <span className="text-xl">Movie Length:</span> {movie.runtime} minutes
      </p>
      <div className="flex items-baseline">
       <h2 className="text-xl">Genres: </h2>
       {movie.genres.map((g) => {
        return <span className="px-1">{g.name} </span>;
       })}
      </div>
     </div>
    </div>
    <div className="w-full absolute bottom-5">
     <h1 className="text-center text-2xl">Cast</h1>
     <ActorsList movie={movie} />
     <div className="flex justify-center m-5">{handleButtonToShow()}</div>
    </div>
   </div>
  </div>
 );
};
