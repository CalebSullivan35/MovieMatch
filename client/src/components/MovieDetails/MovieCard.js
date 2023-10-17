export const MovieCard = (movie) => {
 console.log(movie);
 return (
  <div className="card lg:card-side bg-base-100 shadow-xl w-10/12">
   <figure>
    <img
     src={`http://image.tmdb.org/t/p/w185/${movie.movie.poster_path}`}
     alt="Album"
    />
   </figure>
   <div className="card-body">
    <h2 className="card-title"></h2>
    <h1 className="text-4xl">Title: {movie.movie.title}</h1>
    <div className="card-actions justify-end">
     <button className="btn btn-primary">+</button>
    </div>
   </div>
  </div>
 );
};
