import { useEffect, useRef, useState } from "react";
import { getMovieCredits } from "../../managers/moveManager";

export const ActorsList = ({ movie }) => {
 const [credits, setCredits] = useState({});

 const carouselRef = useRef(null);

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
  <div className="w-full flex flex-col mt-auto">
   <div className="flex flex-row justify-end mr-5">
    <button onClick={() => scrollCarousel("left")} className="mr-3">
     Left
    </button>
    <button onClick={() => scrollCarousel("right")} className="">
     Right
    </button>
   </div>
   <div className="carousel rounded-box w-full mt-2" ref={carouselRef}>
    {credits.cast.map(
     (c) =>
      c.profile_path && (
       <div className="carousel-item flex flex-col" key={c.id}>
        <img
         className="w-32 h-32 m-2 rounded-full"
         src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
         alt={c.name}
        />
        <p className="text-center mt-2">{c.name}</p>
       </div>
      )
    )}
   </div>
  </div>
 );
};
