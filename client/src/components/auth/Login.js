import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";

export default function Login({ setLoggedInUser }) {
 const navigate = useNavigate();
 const [email, setEmail] = useState("admina@strator.comx");
 const [password, setPassword] = useState("");
 const [failedLogin, setFailedLogin] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  login(email, password).then((user) => {
   if (!user) {
    setFailedLogin(true);
   } else {
    setLoggedInUser(user);
    navigate("/");
   }
  });
 };

 return (
  <div className="container mx-auto max-w-md p-4 bg-white shadow-md rounded-lg">
   <h3 className="text-2xl font-semibold mb-4">Login</h3>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Email
    </label>
    <input
     className={`w-full border rounded-lg p-2 ${
      failedLogin ? "border-red-500" : "border-gray-300"
     }`}
     type="text"
     value={email}
     onChange={(e) => {
      setFailedLogin(false);
      setEmail(e.target.value);
     }}
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-600 text-sm font-medium mb-1">
     Password
    </label>
    <input
     className={`w-full border rounded-lg p-2 ${
      failedLogin ? "border-red-500" : "border-gray-300"
     }`}
     type="password"
     value={password}
     onChange={(e) => {
      setFailedLogin(false);
      setPassword(e.target.value);
     }}
    />
    {failedLogin && <p className="text-red-500 text-sm">Login failed.</p>}
   </div>

   <button
    className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4"
    onClick={handleSubmit}
   >
    Login
   </button>

   <p className="text-gray-600 text-sm">
    Not signed up?{" "}
    <Link to="/register" className="text-blue-500">
     Register here
    </Link>
   </p>
  </div>
 );
}
