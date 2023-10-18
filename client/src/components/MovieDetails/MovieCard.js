import { useEffect } from "react";

export const MovieCard = (movie) => {
 console.log(movie);
 return (
  <div className="card lg:card-side lg:h-2/6 bg-base-300 shadow-xl w-7/12">
   <figure className="h-full w-3/6">
    <img
     className="h-auto"
     src={`http://image.tmdb.org/t/p/w500/${movie.movie.poster_path}`}
     alt="Album"
    />
   </figure>
   <div className="card-body">
    <h2 className="card-title"></h2>
    <h1 className="text-4xl text-center">{movie.movie.title}</h1>
    {/* content diff */}
    <div className="">
     <p>{movie.movie.overview}</p>
     <p>{movie.movie.release_date}</p>
     <p>Movie Length: {movie.movie.runtime} minutes</p>
     <div className="flex items-baseline">
      <h2 className="text-xl">Genres: </h2>
      {movie.movie.genres.map((g) => {
       return <span className="px-1">{g.name} </span>;
      })}
     </div>
    </div>

    <div className="card-actions justify-end">
     <button className="btn btn-primary">+</button>
    </div>
   </div>
  </div>
 );
};
