import React from "react";
import { Link } from "react-router-dom";
import { userIcon, cartIcon } from "../icons";
import "./header.css";
import authConsumer from "./authConsumer.jsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ItemProps} from "../Pages/CartPage.jsx";

const Header = ({ user,cart }) => {
  console.log("header", cart);
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="headerLogo" src="/images/Logo.jpg" />
      </Link>
      <div className="headerButtons">
        {user.email && <WelcomeIcon user={user} />}
        {!user.email && <LoginRegistrationIcon />}

        <Link className="headerButton" to={"/checkout/cart"}>
          <button className="instagram" type="submit">
            <img
              className={"buttonImage"}
              src={cartIcon}
              alt=""
              style={{ height: 35 }}
            />
            Cart
          </button>
        </Link>
      </div>
    </div>
  );
};
Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  cart: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
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

const WelcomeIcon = ({user}) => (
  <div>
    <Link className={"headerButton"} to={`/users/$user._id`}>
      <img src={userIcon} />
      <div className={"headerButtons-text"}>Welcome, ${user.email}</div>
    </Link>
  </div>
);

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (store) => {
  return {
      cart: store.cart,
      user: store.user,
  };
};

export default connect(mapStateToProps)(authConsumer(Header));

