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
  <div className="container mx-auto max-w-md p-4 bg-neutral-content shadow-2xl rounded-2xl mt-40 xl:w-full">
   <h3 className="text-3xl font-bold mb-4 text-center text-black">Login</h3>
   <div className="mb-4">
    <label className="block text-black text-3xl font-medium mb-1">Email</label>
    <input
     className={`text-3xl w-full border rounded-lg p-2 text-black bg-white ${
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
    <label className="text-3xl block text-gray-600 font-medium mb-1">
     Password
    </label>
    <input
     className={`w-full border rounded-lg p-2 text-3xl bg-white text-black ${
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
    className="w-full bg-primary text-3xl text-white p-2 rounded-lg mb-4"
    onClick={handleSubmit}
   >
    Login
   </button>

   <p className="text-gray-600 text-xl">
    Not signed up?{" "}
    <Link to="/register" className="text-primary texl-xl">
     Register here
    </Link>
   </p>
  </div>
 );
}
