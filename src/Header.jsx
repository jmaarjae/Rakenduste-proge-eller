import React from "react";
import { Link } from "react-router-dom";
//import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="headerLogo" src="/images/Logo.jpg" />
      </Link>
      <div className="headerButtons">
        <img src="/images/user.svg"/>
        <button>Login/Signup</button>
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Header;

