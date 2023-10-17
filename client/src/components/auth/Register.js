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
  <div className="container mx-auto max-w-md p-4 bg-white shadow-md rounded-lg">
   <h3 className="text-2xl font-semibold mb-4">Sign Up</h3>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     First Name
    </label>
    <input
     className="w-full border rounded-lg p-2"
     type="text"
     value={firstName}
     onChange={(e) => setFirstName(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Last Name
    </label>
    <input
     className="w-full border rounded-lg p-2"
     type="text"
     value={lastName}
     onChange={(e) => setLastName(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Email
    </label>
    <input
     className="w-full border rounded-lg p-2"
     type="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     User Name
    </label>
    <input
     className="w-full border rounded-lg p-2"
     type="text"
     value={userName}
     onChange={(e) => setUserName(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Address
    </label>
    <input
     className="w-full border rounded-lg p-2"
     type="text"
     value={address}
     onChange={(e) => setAddress(e.target.value)}
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Password
    </label>
    <input
     className={`w-full border rounded-lg p-2 ${
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
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Confirm Password
    </label>
    <input
     className={`w-full border rounded-lg p-2 ${
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
    className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4"
    onClick={handleSubmit}
    disabled={passwordMismatch}
   >
    Register
   </button>
   <p className="text-gray-600 text-sm">
    Already signed up?{" "}
    <Link to="/login" className="text-blue-500">
     Log in here
    </Link>
   </p>
  </div>
 );
}
