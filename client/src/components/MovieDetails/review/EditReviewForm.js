import { useEffect, useState } from "react";
import { updateReview } from "../../../managers/reviewManager";

export const EditReviewForm = ({ review, getData }) => {
 const [updatedReviewContent, setUpdatedReviewContent] = useState("");
 const [updatedRating, setUpdatedRating] = useState(0);

 //we first need to get and store the review we are seletecting.

 const setData = () => {
  document.getElementById(`my_modal_Edit_${review.id}`).showModal();
  setUpdatedRating(parseFloat(review.rating));
  setUpdatedReviewContent(review.content);
 };

 const resetState = () => {
  setUpdatedReviewContent("");
  setUpdatedRating(0);
 };

 const handleRatingChange = (e) => {
  setUpdatedRating(parseFloat(e.target.value));
 };

 const handleSubmitButton = () => {
  const updatedReview = {
   Id: review.id,
   UserProfileId: review.UserProfileId,
   MatchingMovieInteger: review.MatchingMovieInteger,
   Rating: updatedRating,
   Content: updatedReviewContent,
   DateAdded: review.DateAdded,
  };

  updateReview(updatedReview).then(() => {
   getData().then(() => {
    resetState();
   });
  });
 };

 if (review == null) {
  return "";
 }
 return (
  <>
   <button className="btn btn-primary mt-10" onClick={() => setData()}>
    Edit Review
   </button>
   <dialog id={`my_modal_Edit_${review.id}`} className="modal">
    <div className="modal-box">
     <h3 className="font-bold text-lg mb-2">Edit Review!</h3>
     <div className="form-control">
      <div>
       <div className="rating rating-lg rating-half">
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className="rating-hidden"
         value={0}
         onChange={handleRatingChange}
         checked={updatedRating === 0}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-1"
         value={0.5}
         onChange={handleRatingChange}
         checked={updatedRating === 0.5}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-2"
         value={1}
         onChange={handleRatingChange}
         checked={updatedRating === 1}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-1"
         value={1.5}
         onChange={handleRatingChange}
         checked={updatedRating === 1.5}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={2}
         checked={updatedRating === 2}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-1"
         onChange={handleRatingChange}
         value={2.5}
         checked={updatedRating === 2.5}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={3}
         checked={updatedRating === 3}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-1"
         onChange={handleRatingChange}
         value={3.5}
         checked={updatedRating === 3.5}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={4}
         checked={updatedRating === 4}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-1 "
         onChange={handleRatingChange}
         value={4.5}
         checked={updatedRating === 4.5}
        />
        <input
         type="radio"
         name={`EditRating/${review.id}`}
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={5}
         checked={updatedRating === 5}
        />
       </div>
      </div>
      <textarea
       className="textarea textarea-bordered h-24"
       placeholder="Type Here..."
       value={updatedReviewContent}
       onChange={(e) => {
        setUpdatedReviewContent(e.target.value);
       }}
      ></textarea>
      <label className="label"></label>
     </div>
     <div className="modal-action">
      <form method="dialog">
       <button
        className="btn btn-primary mr-2"
        onClick={() => {
         handleSubmitButton();
        }}
       >
        Submit
       </button>
       <button
        className="btn btn-error"
        onClick={() => {
         resetState();
        }}
       >
        Cancel
       </button>
      </form>
     </div>
    </div>
   </dialog>
  </>
 );
};
