import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const MovieCarousel = ({ movieList }) => {
 const carouselRef = useRef(null);
 const navigate = useNavigate();
 const itemWidth = 300; // Adjust the item width as needed
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
 if (movieList == null) {
  return "";
 }
 return (
  <div className="w-full flex flex-col">
   <div className="flex flex-row justify-end">
    <button
     className="btn btn-md btn-sq btn-outline mr-3"
     onClick={() => scrollCarousel("left")}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className="fill-primary"
     >
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
     </svg>
    </button>
    <button
     className="btn btn-sq btn-outline"
     onClick={() => scrollCarousel("right")}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className="fill-primary"
     >
      <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
     </svg>
    </button>
   </div>
   <div className="carousel w-full mt-2" ref={carouselRef}>
    {movieList.map((m) => (
     <div className="carousel-item flex flex-col" key={m.id}>
      <img
       className="mx-2 h-96  rounded-xl"
       src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
       alt={m.name}
       onClick={() => {
        navigate(`movie/${m.id}`);
       }}
      />
     </div>
    ))}
   </div>
  </div>
 );
};
