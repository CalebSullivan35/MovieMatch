import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/ApplicationViews";
import NavBar from "./components/navbar";

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
  return <Spinner />;
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
