import React from "react";
import { Link } from "react-router-dom";
import { userIcon, cartIcon } from "./icons";
import "./header.css";
//Võimaldab propsideta proge
import { AuthContext } from "./index";

const Header = () => {
  return (
    <AuthContext.Consumer>
      {contextValue => {
        <div className="header">
          <Link to={"/"}>
            <img className="headerLogo" src="/images/Logo.jpg" />
          </Link>
          <div className="headerButtons">
            {contextValue.user.email && <WelcomeIcon user={user} />}
            {!contextValue.user.email && <LoginRegistrationIcon />}

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
        </div>;
      }}
    </AuthContext.Consumer>
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
