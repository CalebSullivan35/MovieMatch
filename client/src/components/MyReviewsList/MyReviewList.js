import { useEffect, useState } from "react";
import {
 deleteReview,
 getReviewById,
 getReviewByUserId,
} from "../../managers/reviewManager";
import { ReviewForm } from "../MovieDetails/review/ReviewForm";
import { EditReviewForm } from "../MovieDetails/review/EditReviewForm";

export const MyReviewList = ({ loggedInUser }) => {
 const [myReviews, setMyReviews] = useState([]);
 //get all the reviews
 function getData() {
  getReviewByUserId(loggedInUser.id).then(setMyReviews);
 }
 useEffect(() => {
  getData();
 }, []);

 const handleDeleteButton = (id) => {
  deleteReview(id).then(() => {
   getData();
  });
 };

 return (
  <div className="overflow-x-auto">
   <table className="table">
    {/* head */}
    <thead>
     <tr>
      <th>Movie</th>
      <th>Content</th>
      <th>Rating</th>
      <th>Actions</th>
     </tr>
    </thead>
    <tbody>
     {/* row 1 */}
     {myReviews.map((r) => {
      return (
       <tr>
        <td>
         <div className="flex items-center space-x-3">
          <div className="avatar">
           <div className="mask mask-squircle w-12 h-12">
            <img
             src={`http://image.tmdb.org/t/p/w185/${r.movie.posterPath}`}
             alt="Avatar Tailwind CSS Component"
            />
           </div>
          </div>
          <div>
           <div className="font-bold">{r.movie.title}</div>
          </div>
         </div>
        </td>
        <td>{r.content}</td>
        <td>
         {" "}
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
        </td>
        <th>
         <EditReviewForm review={r} getData={getData} />
         <button
          className="btn btn-warning"
          onClick={() => {
           handleDeleteButton(r.id);
          }}
         >
          Delete
         </button>
        </th>
       </tr>
      );
     })}
    </tbody>
    {/* foot */}
   </table>
  </div>
 );
};
