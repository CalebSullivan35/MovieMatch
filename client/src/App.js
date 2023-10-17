import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";

import ApplicationViews from "./components/ApplicationViews";
import NavBar from "./components/NavBar";

function App() {
 const [loggedInUser, setLoggedInUser] = useState();

 useEffect(() => {
  // user will be null if not authenticated
  tryGetLoggedInUser().then((user) => {
   setLoggedInUser(user);
  });
 }, []);

 // wait to get a definite logged-in state before rendering
 if (loggedInUser === undefined) {
  return <h1>Waiting</h1>;
 }

 return (
  <>
   <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
   <ApplicationViews
    loggedInUser={loggedInUser}
    setLoggedInUser={setLoggedInUser}
   />
  </>
 );
}

export default App;
