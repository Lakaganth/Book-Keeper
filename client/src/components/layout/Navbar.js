import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";
import Logout from "./logout.svg";
import AuthContext from "./../../context/auth/authContext";
import BookContext from "./../../context/book/bookContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { logout } = authContext;
  const { clearBooks } = bookContext;

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
      <div
        className="logout"
        onClick={() => {
          logout();
          clearBooks();
        }}
      >
        <img src={Logout} alt="" />{" "}
      </div>
    </nav>
  );
};

export default Navbar;
