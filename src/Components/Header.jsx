import React from "react";
import { Link } from "react-router-dom";
import { userIcon, cartIcon } from "../icons";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="headerLogo" src="/images/Logo.jpg" />
      </Link>
      <div className="headerButtons">
        <Link className="headerButton" to="/login">
          <img src={userIcon} />
          <div className={"headerButton-text"}>
            Login/
            <br />
            Signup
          </div>
        </Link>

        <div className="headerButton">
          <img src={cartIcon} />
          <div className={"headerButton-text"}>Cart</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
