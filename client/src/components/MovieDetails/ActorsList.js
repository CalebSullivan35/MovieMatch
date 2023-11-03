import { useEffect, useRef, useState } from "react";
import { getMovieCredits } from "../../managers/moveManager";
import { useNavigate } from "react-router-dom";

export const ActorsList = ({ movie }) => {
 const [credits, setCredits] = useState({});
 const carouselRef = useRef(null);
 const navigate = useNavigate();
 function getCreditData() {
  getMovieCredits(movie.id).then(setCredits);
 }

 useEffect(() => {
  getCreditData();
 }, []);

 if (!credits.cast) {
  return "";
 }

 const itemWidth = 200; // Adjust the item width as needed
 const scrollAmount = 3;
//function to handle the scrolling carousel.
 const scrollCarousel = (direction) => {
  const scrollContainer = carouselRef.current;
  if (scrollContainer) {
   const currentScrollLeft = scrollContainer.scrollLeft;
   const newScrollLeft =
    direction === "left"
     ? currentScrollLeft - itemWidth * scrollAmount
     : currentScrollLeft + itemWidth * scrollAmount;
   scrollContainer.scrollTo({
    left: newScrollLeft,
    behavior: "smooth", // This enables smooth scrolling
   });
  }
 };

 return (
  <div className="w-full flex justify-center">
   <div className="w-full flex flex-col mt-auto xl:w-10/12">
    <div className="flex flex-row justify-between">
     <h1 className="float-left text-3xl italic underline">Cast</h1>
     <div>
      <button
       onClick={() => scrollCarousel("left")}
       className="mr-3 hover:text-primary"
      >
       <svg fill="currentColor" viewBox="0 0 16 16" height="2em" width="2em">
        <path
         fillRule="evenodd"
         d="M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8z"
        />
       </svg>
      </button>
      <button onClick={() => scrollCarousel("right")}>
       <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="2em"
        width="2em"
        className=" hover:text-primary"
       >
        <path
         fillRule="evenodd"
         d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
        />
       </svg>
      </button>
     </div>
    </div>
    <div className="carousel rounded-box w-full mt-2" ref={carouselRef}>
     {credits.cast.map(
      (c) =>
       c.profile_path && (
        <div className="carousel-item flex flex-col m-2 w-32" key={c.id}>
         <img
          className=" w-28 rounded-2xl"
          src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
          alt={c.name}
         />
         <p className="text-center mt-2 text-xl">{c.name}</p>
         <p className="text-center">Playing As:</p>
         <p className="text-center text-xl">{c.character}</p>
        </div>
       )
     )}
    </div>
   </div>
  </div>
 );
};
