import { useEffect, useState } from "react";
import { postNewReview } from "../../../managers/reviewManager";

export const ReviewForm = ({ loggedInUser, movie, getData }) => {
 const [newReviewContent, setNewReviewContent] = useState("");
 const [newRating, setNewRating] = useState(0);

 const resetState = () => {
  setNewReviewContent("");
  setNewRating(0);
 };

 const handleSubmit = () => {
  const newReview = {
   UserProfileId: loggedInUser.id,
   MatchingMovieInteger: movie.id,
   rating: newRating,
   content: newReviewContent,
  };

  postNewReview(newReview).then(() => {
   getData().then(resetState());
  });
 };

 const handleRatingChange = (e) => {
  setNewRating(parseFloat(e.target.value));
 };
 if (newRating == null) {
  return "";
 }
 return (
  <>
   <button
    className="btn btn-primary mt-10"
    onClick={() => document.getElementById("my_modal_1").showModal()}
   >
    Leave A Review
   </button>
   <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
     <h3 className="font-bold text-lg mb-2">New Review!</h3>
     <div className="form-control">
      <div>
       <div className="rating rating-lg rating-half">
        <input
         type="radio"
         name="rating-10"
         className="rating-hidden"
         value={0}
         onChange={handleRatingChange}
         checked={newRating === 0}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-1"
         value={0.5}
         onChange={handleRatingChange}
         checked={newRating === 0.5}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-2"
         value={1}
         onChange={handleRatingChange}
         checked={newRating === 1}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-1"
         value={1.5}
         onChange={handleRatingChange}
         checked={newRating === 1.5}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={2}
         checked={newRating === 2}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-1"
         onChange={handleRatingChange}
         value={2.5}
         checked={newRating === 2.5}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={3}
         checked={newRating === 3}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-1"
         onChange={handleRatingChange}
         value={3.5}
         checked={newRating === 3.5}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={4}
         checked={newRating === 4}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-1 "
         onChange={handleRatingChange}
         value={4.5}
         checked={newRating === 4.5}
        />
        <input
         type="radio"
         name="rating-10"
         className=" mask mask-star-2 mask-half-2"
         onChange={handleRatingChange}
         value={5}
         checked={newRating === 5}
        />
       </div>
      </div>
      <textarea
       className="textarea textarea-bordered h-24"
       placeholder="Type Here..."
       value={newReviewContent}
       onChange={(e) => {
        setNewReviewContent(e.target.value);
       }}
      ></textarea>
      <label className="label"></label>
     </div>
     <div className="modal-action">
      <form method="dialog">
       <button
        className="btn btn-primary mr-2"
        onClick={() => {
         handleSubmit();
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
