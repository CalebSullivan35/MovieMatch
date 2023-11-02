import { useEffect, useState } from "react";
import {
 deleteUserProfileMovie,
 getUserProfileMovieByUserId,
 postUserProfileMovie,
} from "../../managers/userProfileMovieManager";
import { ActorsList } from "./ActorsList";
import { ReviewForm } from "./review/ReviewForm";

export const MovieCard = ({ movie, loggedInUser, getData }) => {
 const [myRelationships, setmyRelationships] = useState([]);
 function getRelationships() {
  getUserProfileMovieByUserId(loggedInUser.id).then(setmyRelationships);
 }

 useEffect(() => {
  getRelationships();
 }, []);

 //function that turns runtime into hours and minutes
 const minsToHours = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const remainderMinutes = runtime % 60;
  return `${hours}h ${remainderMinutes}mins`;
 };

 //button to post a new relationship
 const handleAddButton = () => {
  //declare a new relationship
  const newRelationship = {
   matchingMovieInteger: movie.id,
   userProfileId: loggedInUser.id,
  };
  //send new relationship to api
  postUserProfileMovie(newRelationship).then(() => getRelationships());
 };

 //handles delete button
 function handleDeleteButton() {
  const matchingRelationship = myRelationships.find(
   (r) => r.matchingMovieInteger === movie.id
  );
  deleteUserProfileMovie(matchingRelationship.id).then(getRelationships());
 }

 const handleButtonToShow = () => {
  if (myRelationships.some((r) => r.matchingMovieInteger === movie.id)) {
   return (
    <button
     className="btn btn-error sm:text-xl mr-5"
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
     className="btn btn-primary sm:text-xl mr-5"
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
  <div
   className="flex flex-col justify-center w-11/12
  sm:w-4/6 lg:flex-row bg-primary-content p-2 xl:p-5 rounded-t-2xl"
  >
   <div className="rounded-2xl lg:w-2/6">
    <img
     src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
     alt="Album"
     className="h-full w-full rounded-2xl"
    />
   </div>
   <div className=" flex items-center px-2 mt-5 w-full  flex-col lg:w-4/6 2xl:w-3/4">
    <h1 className="text-6xl text-center font-bold">{movie.title}</h1>
    <h2 className="text-2xl text-center italic mb-5">{movie.tagline}</h2>
    <p className="text-2xl opacity-70 justify-center text-center">
     {movie?.genres.map((g) => {
      return <span className="mr-2">{g.name}</span>;
     })}
     <span className="mr-2">
      <svg
       viewBox="0 0 1024 1024"
       fill="currentColor"
       height="1em"
       width="1em"
       className="inline mb-3"
      >
       <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
      </svg>
      {movie.vote_average.toString().slice(0, 3)}/10
     </span>
     <span className="mr-2">{minsToHours(movie.runtime)}</span>
     <span className="mr-2"> {movie.release_date.split("-")[0]}</span>
    </p>
    <p className="mb-5 mx-5 xl:mx-20 text-xl">{movie.overview}</p>
    <ActorsList movie={movie} />

    <div className="flex flex-row justify-center mb-5 ">
     {handleButtonToShow()}
     <ReviewForm movie={movie} loggedInUser={loggedInUser} getData={getData} />
    </div>
   </div>
  </div>
 );
};
