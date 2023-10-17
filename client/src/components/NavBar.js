import { useState } from "react";
import { logout } from "../managers/authManager";
import { NavLink as RRNavLink } from "react-router-dom";
import {
 Button,
 Collapse,
 Nav,
 NavLink,
 NavItem,
 Navbar,
 NavbarBrand,
 NavbarText,
 NavbarToggler,
} from "reactstrap";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
 const [open, setOpen] = useState(false);

 const toggleNavbar = () => setOpen(!open);

 return (
  <div>
   <Navbar color="light" light fixed="true" expand="lg">
    <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
     Movie Match
    </NavbarBrand>
    {loggedInUser ? (
     <>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={open} navbar>
       <Nav navbar></Nav>
      </Collapse>
      <Button
       className=""
       color="primary"
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
      </Button>
     </>
    ) : (
     <Nav navbar>
      <NavItem>
       <NavLink tag={RRNavLink} to="/login">
        <button className="btn btn-primary" color="primary">
         Login
        </button>
       </NavLink>
      </NavItem>
     </Nav>
    )}
   </Navbar>
  </div>
 );
}
