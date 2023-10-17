import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { HomeList } from "./ListMovies/HomeList";
import { MovieDetail } from "./MovieDetails/MovieDetail";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
 return (
  <Routes>
   <Route path="/">
    <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
    <Route
     path="register"
     element={<Register setLoggedInUser={setLoggedInUser} />}
    />
    <Route
     index
     element={
      <AuthorizedRoute loggedInUser={loggedInUser}>
       <HomeList />
      </AuthorizedRoute>
     }
    />

    <Route
     path="/movie/:id"
     element={
      <AuthorizedRoute loggedInUser={loggedInUser}>
       <MovieDetail />
      </AuthorizedRoute>
     }
    ></Route>
   </Route>
   <Route path="*" element={<p>Whoops, nothing here...</p>} />
  </Routes>
 );
}
