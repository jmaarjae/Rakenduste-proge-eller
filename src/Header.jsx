import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="headerLogo" src="./images/Logo.jpg" />
      </Link>
      <div className="headerButtons">
        <button>Login/Signup</button>
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Header;
