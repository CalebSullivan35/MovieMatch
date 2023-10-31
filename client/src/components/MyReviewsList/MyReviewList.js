import { useEffect, useState, useContext } from "react";
import { deleteReview, getReviewByUserId } from "../../managers/reviewManager";
import { EditReviewForm } from "../MovieDetails/review/EditReviewForm";
import { useMediaQuery } from "@uidotdev/usehooks";

export const MyReviewList = ({ loggedInUser }) => {
 const isLargeScreen = useMediaQuery("(min-width: 1024px)");
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
  <>
   {!isLargeScreen ? (
    <div className="flex flex-col items-center">
     {myReviews.map((r) => {
      return (
       <div className="flex items-center w-4/6 flex-col border my-2 py-4 rounded-xl">
        <div className="mask mask-squircle w-24 h-24">
         <img
          src={`http://image.tmdb.org/t/p/w185/${r.movie.posterPath}`}
          alt="Avatar Tailwind CSS Component"
         />
        </div>
        <h2>{r.movie.title}</h2>
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
        <p className="w-4/5 p-2 my-2">{r.content}</p>
        <div>
         <EditReviewForm review={r} getData={getData} />
         <button
          className="btn btn-warning mx-2"
          onClick={() => {
           handleDeleteButton(r.id);
          }}
         >
          Delete
         </button>
        </div>
       </div>
      );
     })}
    </div>
   ) : (
    <div className="lg:visible w-screen items-center">
     <table className="table">
      {/* head */}
      <thead>
       <tr>
        <th className="text-center">Movie</th>
        <th className="text-center">Content</th>
        <th className="text-center">Rating</th>
        <th className="text-center">Actions</th>
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
             <div className="mask mask-squircle w-24 h-24">
              <img
               src={`http://image.tmdb.org/t/p/w185/${r.movie.posterPath}`}
               alt="Avatar Tailwind CSS Component"
              />
             </div>
            </div>
            <div>
             <div className="font-bold text-2xl">{r.movie.title}</div>
            </div>
           </div>
          </td>
          <td className="w-3/6 text-xl">{r.content}</td>
          <td>
           <div className="flex justify-center">
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
          <td>
           <div className="flex flex-row justify-center">
            <EditReviewForm review={r} getData={getData} />
            <button
             className="btn btn-warning mx-2"
             onClick={() => {
              handleDeleteButton(r.id);
             }}
            >
             Delete
            </button>
           </div>
          </td>
         </tr>
        );
       })}
      </tbody>
      {/* foot */}
     </table>
    </div>
   )}
  </>
 );
};
