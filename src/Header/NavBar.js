import React from "react";
import {NavLink} from "react-router-dom";

const navActive = {color: "#1A98A6"}

function NavBar(props){

  return(
    <nav className="navbar">
      <ul>
        <li><NavLink exact activeStyle={navActive} to="/">HOME</NavLink></li>
        <li><NavLink activeStyle={navActive} to="/upcoming">UPCOMING MOVIES</NavLink></li>
        <li><NavLink activeStyle={navActive} to="/about">ABOUT</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
