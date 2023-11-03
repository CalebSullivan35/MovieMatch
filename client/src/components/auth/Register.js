import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ setLoggedInUser }) {
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [userName, setUserName] = useState("");
 const [email, setEmail] = useState("");
 const [address, setAddress] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");

 const [passwordMismatch, setPasswordMismatch] = useState(false);

 const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
   setPasswordMismatch(true);
  } else {
   const newUser = {
    firstName,
    lastName,
    userName,
    email,
    address,
    password,
   };
   register(newUser).then((user) => {
    setLoggedInUser(user);
    navigate("/");
   });
  }
 };

 return (
  <div className="container mx-auto max-w-md p-4 bg-neutral-content shadow-md rounded-lg mt-20">
   <h3 className="text-5xl font-semibold mb-4 text-black text-center ">
    Sign Up
   </h3>
   <div className="mb-4">
    <label className="block text-black text-2xl font-medium mb-1">
     First Name
    </label>
    <input
     className="w-full border rounded-lg p-2 text-2xl text-black bg-white"
     type="text"
     value={firstName}
     onChange={(e) => setFirstName(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-black text-2xl font-medium mb-1">
     Last Name
    </label>
    <input
     className="w-full border rounded-lg p-2 text-black text-2xl bg-white"
     type="text"
     value={lastName}
     onChange={(e) => setLastName(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block font-medium mb-1 text-black text-2xl">Email</label>
    <input
     className="w-full border rounded-lg p-2 text-black text-2xl bg-white"
     type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block font-medium mb-1 text-black text-2xl">
     User Name
    </label>
    <input
     className="w-full border rounded-lg p-2 text-black text-2xl bg-white"
     type="text"
     value={userName}
     onChange={(e) => setUserName(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-black text-2xl font-medium mb-1 ">
     Address
    </label>
    <input
     className="w-full border rounded-lg p-2 bg-white"
     type="text"
     value={address}
     onChange={(e) => setAddress(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-black text-2xl font-medium mb-1">
     Password
    </label>
    <input
     className={`w-full border rounded-lg p-2 text-black text-2xl bg-white${
      passwordMismatch ? "border-red-500" : ""
     }`}
     type="password"
     value={password}
     onChange={(e) => {
      setPasswordMismatch(false);
      setPassword(e.target.value);
     }}
    />
   </div>
   <div className="mb-4">
    <label className="block text-black text-2xl font-medium mb-1">
     Confirm Password
    </label>
    <input
     className={`w-full border rounded-lg p-2 text-black text-2xl bg-white${
      passwordMismatch ? "border-red-500" : ""
     }`}
     type="password"
     value={confirmPassword}
     onChange={(e) => {
      setPasswordMismatch(false);
      setConfirmPassword(e.target.value);
     }}
    />
    {passwordMismatch && (
     <p className="text-red-500 text-sm">Passwords do not match!</p>
    )}
   </div>
   <button
    className="w-full bg-primary text-2xl text-black font-bold p-2 rounded-lg mb-4"
    onClick={handleSubmit}
    disabled={passwordMismatch}
   >
    Register
   </button>
   <p className="text-black text-lg">
    Already signed up?{" "}
    <Link to="/login" className="text-primary text-xl">
     Log in here
    </Link>
   </p>
  </div>
 );
}
