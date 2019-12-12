import React from "react";
import { Link } from "react-router-dom";
import { userIcon, cartIcon } from "../icons";
import "./header.css";
//import authConsumer from "./authConsumer.jsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ItemProps } from "../Pages/CartPage.jsx";

const Header = ({ user, cart }) => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="headerLogo" src="/images/Logo.jpg" />
      </Link>
      <div className="headerButtons">
        {user.email && <WelcomeIcon user={user} />}
        {!user.email && <LoginRegistrationIcon />}

        <Link to={"/checkout/cart"} className={"headerButton"}>
          <img src={cartIcon} />
          <div className={"headerButton-text"}>Cart</div>

          <Badge>{cart.length}</Badge>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  cart: PropTypes.arrayOf(ItemProps).isRequired
};

const Badge = ({ children }) => {
  if (children === 0) return null;
  return <span className={"badge"}>{children}</span>;
};

Badge.propTypes = {
  children: PropTypes.number.isRequired
};

const LoginRegistrationIcon = () => (
  <div>
    <Link className={"headerButton"} to={"/login"}>
      <img src={userIcon} />
      <div className={"headerButtons-text"}>
        Login/
        <br />
        Signup
      </div>
    </Link>
  </div>
);

const WelcomeIcon = ({ user }) => (
  <div>
    <Link className={"headerButton"} to={`/users/${user._id}`}>
      <img src={userIcon} />
      <div className={"headerButtons-text"}>Welcome, ${user.email}</div>
    </Link>
  </div>
);

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    cart: store.cart,
    user: store.user
  };
};

export default connect(mapStateToProps)(Header);
