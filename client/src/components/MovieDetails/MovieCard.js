export const MovieCard = (movie) => {
 console.log(movie);
 return (
  <div className="card lg:card-side bg-base-100 shadow-xl">
   <figure>
    <img
     src={`http://image.tmdb.org/t/p/w185/${movie.movie.poster_path}`}
     alt="Album"
    />
   </figure>
   <div className="card-body">
    <h2 className="card-title"></h2>
    <p>Click the button to add to Favorites</p>
    <div className="card-actions justify-end">
     <button className="btn btn-primary">+</button>
    </div>
   </div>
  </div>
 );
};
