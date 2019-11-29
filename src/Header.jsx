import React from "react";
import { Link } from "react-router-dom";
import { userIcon, cartIcon } from "./icons";
import "./header.css";

const Header = ({ token }) => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="headerLogo" src="/images/Logo.jpg" />
      </Link>
      <div className="headerButtons">
        {user.email && <WelcomeIcon user={user} />}
        {!user.email && <LoginRegistrationIcon />}

        <div className="headerButton">
          <img src={userIcon} />
          <div className={"headerButton-text"}>
            Login/
            <br />
            Signup
          </div>
        </div>

        <div className="headerButton">
          <img src={cartIcon} />
          <div className={"headerButton-text"}>Cart</div>
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  token: PropTypes.string
};

const LoginRegistrationIcon = () => (
  <div>
    <Link className={"headerButton"} to={"/login"}>
      <img src={profileIcon} />
      <div className={"headerButtons-text"}>
        Login/
        <br />
        Signup
      </div>
    </Link>
  </div>
);

const WelcomeIcon = () => (
  <div>
    <Link className={"headerButton"} to={`/users/$user._id`}>
      <img src={profileIcon} />
      <div className={"headerButtons-text"}>Welcome, ${user.email}</div>
    </Link>
  </div>
);

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired
};

export default Header;
