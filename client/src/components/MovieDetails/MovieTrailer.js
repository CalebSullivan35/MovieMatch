import { useEffect, useState } from "react";
import { getMovieVideos } from "../../managers/moveManager";

export const MovieTrailer = ({ movie }) => {
 const [videos, setVideos] = useState([]);
 const [youtubeVideo, setYoutubeVideo] = useState({});

 function getVideos() {
  getMovieVideos(movie.id).then(setVideos);
 }
 //movie response.
 useEffect(() => {
  async function fetchVideos() {
   try {
    const movieVideos = await getMovieVideos(movie.id);
    setVideos(movieVideos);
    const rightVideo = movieVideos.results.find((v) => v.type === "Trailer");
    setYoutubeVideo(rightVideo);
   } catch (error) {
    console.error("Error fetching movie videos:", error);
   }
  }

  fetchVideos();
 }, [movie]);

 if (!youtubeVideo) {
  return (
   <iframe
    className="mt-5"
    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
   ></iframe>
  );
 }

 return (
  <div className="px-2 mt-5 w-full aspect-video md:w-8/12 lg:w-4/5 xl:w-2/3 2xl:w-7/12">
   <iframe
    className="w-full h-full"
    src={`https://www.youtube.com/embed/${youtubeVideo.key}`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
   ></iframe>
  </div>
 );
};
