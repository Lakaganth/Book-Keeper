import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";
import Logout from "./logout.svg";

const Navbar = () => {
  return (
    <nav className="navbar grid-4">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="register">
        <Link to="/register">
          <h4>Register</h4>
        </Link>
      </div>
      <div className="login">
        <Link to="/login">
          <h4>Login</h4>
        </Link>
      </div>
      <div className="logout">
        <Link to="/about">
          <img src={Logout} alt="" />{" "}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
