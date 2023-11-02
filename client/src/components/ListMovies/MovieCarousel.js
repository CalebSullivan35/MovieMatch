import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const MovieCarousel = ({ movieList, heading }) => {
 const [hoveredMovie, setHoveredMovie] = useState(null);

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
   <div className="flex flex-row justify-between border-b-2 border-primary pb-2 mb-3">
    <h1 className="text-4xl text-primary-focus font-bold mt-auto">
     {heading}:
    </h1>
    <div>
     <button
      className="hidden sm:btn sm:btn-sq sm:btn-outline mr-3"
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
      className="hidden sm:btn sm:btn-sq sm:btn-outline"
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
   </div>

   <div className="carousel w-full mt-2" ref={carouselRef}>
    {movieList.map((m) => (
     <div
      className="relative carousel-item flex flex-col"
      key={m.id}
      onMouseEnter={() => setHoveredMovie(m)}
      onMouseLeave={() => setHoveredMovie(null)}
     >
      <img
       className="mx-2 h-96 rounded-xl"
       src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
       alt={m.name}
       onClick={() => {
        navigate(`movie/${m.id}`);
       }}
      />
      {hoveredMovie && hoveredMovie.id === m.id && (
       <div
        className="rounded-xl mx-2 absolute inset-0 text-white p-4 hover:cursor-pointer custom-transition text-center text-2xl"
        onClick={() => {
         navigate(`movie/${m.id}`);
        }}
       >
        <p className="text-4xl text-center custom-transition-text">{m.title}</p>
        <p className="custom-transition-text text-center mt-10">
         {m.release_date}
        </p>
        <span className="mr-2 text-center custom-transition-text">
         <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1em"
          width="1em"
          className="inline mb-3"
         >
          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
         </svg>
         {m.vote_average.toString().slice(0, 3)}/10
        </span>
       </div>
      )}
     </div>
    ))}
   </div>
  </div>
 );
};
