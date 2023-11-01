import {
 deleteReview,
 getReviewsByMovieId,
} from "../../managers/reviewManager";
import { useEffect, useState } from "react";
import { EditReviewForm } from "./review/EditReviewForm";

export const MovieReviews = ({ reviews, loggedInUser, getData }) => {
 const handleDeleteButton = (id) => {
  deleteReview(id).then(() => {
   getData();
  });
 };

 return (
  <div className="mt-12 mx-4 w-full sm:w-8/12 bg-primary-content p-5 rounded-xl">
   {reviews.length > 0 ? (
    <h1 className="text-left text-5xl mb-5 underline">REVIEWS</h1>
   ) : (
    ""
   )}

   <div className="h-76">
    {reviews.map((r) => (
     <div className="textarea textarea-bordered w-full text-lg flex flex-col my-4">
      <div className="flex flex-col justify-between">
       <div className="flex justify-between">
        <div className="rating rating-md rating-half">
         <input
          type="radio"
          className="rating-hidden"
          checked={r.rating === 0}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-1"
          checked={r.rating === 0.5}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-2"
          checked={r.rating === 1}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-1"
          checked={r.rating === 1.5}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-2"
          checked={r.rating === 2}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-1"
          checked={r.rating === 2.5}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-2"
          checked={r.rating === 3}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-1"
          checked={r.rating === 3.5}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-2"
          checked={r.rating === 4}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-1"
          checked={r.rating === 4.5}
         />
         <input
          type="radio"
          className=" mask mask-star-2 mask-half-2"
          checked={r.rating === 5}
         />
        </div>
        <h3 className="text-2xl">
         {r?.userProfile?.firstName} {r?.userProfile?.lastName}
        </h3>
       </div>
       <p className="flex justify-end text-2xl">{r.dateAdded.split("T")[0]}</p>
      </div>

      <div className="flex justify-between">
       <p className="w-full ml-3 text-2xl">{r.content}</p>
      </div>
      {loggedInUser.id === r.userProfileId ? (
       <div className="flex flex-row justify-center sm:justify-end mt-5">
        <EditReviewForm review={r} getData={getData} />
        <button
         className="btn btn-secondary mx-2 text-2xl"
         onClick={() => {
          handleDeleteButton(r.id);
         }}
        >
         Delete
        </button>
       </div>
      ) : (
       ""
      )}
     </div>
    ))}
   </div>
  </div>
 );
};
