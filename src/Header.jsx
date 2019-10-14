import React from "react";

const Header = () => {
  return (
    <div className="header">
      <img className="headerLogo" src="./images/Logo.jpg" />
      <div className="headerButtons">
        <button>Login/Signup</button>
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Header;
