import { useState } from "react";
import { logout } from "../managers/authManager";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
 const navigate = useNavigate();
 const [open, setOpen] = useState(false);

 const toggleNavbar = () => setOpen(!open);

 return (
  <div className="navbar bg-base-100">
   <div className="flex-1">
    <a
     className="normal-case text-xl btn btn-secondary"
     onClick={() => {
      navigate("/");
     }}
    >
     Movie Match
    </a>
    {loggedInUser ? (
     <>
      <Link to="/favoritelist">
       <button className="btn btn-ghost">My Favorites</button>
      </Link>
      <Link to="/myreviews">
       <button className="btn btn-ghost">My Reviews</button>
      </Link>
     </>
    ) : (
     ""
    )}
   </div>
   <div className="flex-none">
    {loggedInUser ? (
     <>
      <button
       className="btn btn-ghost mr-5"
       onClick={(e) => {
        e.preventDefault();
        setOpen(false);
        logout().then(() => {
         setLoggedInUser(null);
         setOpen(false);
        });
       }}
      >
       Logout
      </button>
     </>
    ) : (
     <button
      className="btn btn-ghost mr-5"
      onClick={() => {
       navigate("/login");
      }}
     >
      Login
     </button>
    )}
   </div>
  </div>

  // <nav className="bg-light">
  //  <div className="container mx-auto py-4">
  //   <div className="flex justify-between items-center">
  //    <NavLink to="/" className="text-2xl text-blue-600 font-bold">
  //     Movie Match
  //    </NavLink>
  //    {loggedInUser ? (
  //     <div className="flex items-center">
  //      <button
  //       className="px-4 py-2 bg-blue-500 text-white rounded-lg"
  //       onClick={(e) => {
  //        e.preventDefault();
  //        setOpen(false);
  //        logout().then(() => {
  //         setLoggedInUser(null);
  //         setOpen(false);
  //        });
  //       }}
  //      >
  //       Logout
  //      </button>
  //     </div>
  //    ) : (
  //     <div className="space-x-4">
  //      <NavLink to="/login">
  //       <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
  //        Login
  //       </button>
  //      </NavLink>
  //     </div>
  //    )}
  //   </div>
  //  </div>
  // </nav>
 );
}
