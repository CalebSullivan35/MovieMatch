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
  <div className="w-7/12 mt-12">
   <h1 className="text-center text-2xl mb-5">Reviews</h1>
   <div className="h-76">
    {reviews.map((r) => (
     <div className="textarea textarea-bordered w-full text-lg">
      <div className="flex flex-row justify-between">
       <div>
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
       </div>
       <h3>
        {r?.userProfile?.firstName} {r?.userProfile?.lastName}
       </h3>
      </div>

      <div className="flex justify-between">
       <p>{r.content}</p>
       <p>{r.dateAdded.split("T")[0]}</p>
      </div>
      {loggedInUser.id === r.userProfileId ? (
       <>
        <button
         className="btn btn-warning"
         onClick={() => {
          handleDeleteButton(r.id);
         }}
        >
         Delete
        </button>
        <EditReviewForm review={r} getData={getData} />
       </>
      ) : (
       ""
      )}
     </div>
    ))}
   </div>
  </div>
 );
};
