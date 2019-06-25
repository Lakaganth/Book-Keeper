import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";
import Logout from "./logout.svg";
import AuthContext from "./../../context/auth/authContext";
import BookContext from "./../../context/book/bookContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { logout, isAuthenticated } = authContext;
  const { clearBooks } = bookContext;

  if (isAuthenticated) {
    return (
      <nav className="navbar grid-2">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
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
  }

  return null;
};

export default Navbar;
