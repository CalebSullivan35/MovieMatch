import { useState } from "react";
import { logout } from "../managers/authManager";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
 const navigate = useNavigate();
 const [open, setOpen] = useState(false);

 const toggleNavbar = () => setOpen(!open);

 return (
  <div className="navbar bg-base-100">
   <div className="navbar-start">
    {loggedInUser ? (
     <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost md:hidden">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M4 6h16M4 12h8m-8 6h16"
        />
       </svg>
      </label>
      <ul
       tabIndex={0}
       className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
       <li>
        <Link to="/favoritelist">My Favorites</Link>
       </li>
       <li>
        <Link to="/myreviews">My Reviews</Link>
       </li>
      </ul>
     </div>
    ) : (
     ""
    )}

    <a
     className="btn btn-ghost normal-case text-xl"
     onClick={() => {
      navigate("/");
     }}
    >
     MovieMatch
    </a>
   </div>

   <div className="navbar-end">
    <div className="navbar-end hidden md:flex">
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
 );
}
