import React from "react";
import NavBar from "./NavBar";
import "./Header.css";
import logo from "../assets/logo.png";

function Header(props){

  return(
    <div>
      <div className="title">
        <img src={logo} alt="logo"/>
        <h2>MOVIE FINDER</h2>
      </div>
      <NavBar />
    </div>
  );
}


export default Header;
