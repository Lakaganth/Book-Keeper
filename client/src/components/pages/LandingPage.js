import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogoLanding from "./LogoLanding.svg";
import AuthContext from "./../../context/auth/authContext";
import BookContext from "./../../context/book/bookContext";
import Home from "./Home";

const LandingPage = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { loadUser, user, isAuthenticated } = authContext;
  const { getBooks } = bookContext;

  if (isAuthenticated) {
    return (
      <div>
        <Home />
      </div>
    );
  }

  return (
    <div className="container">
      {" "}
      <div className="landingLogo">
        {" "}
        <img src={LogoLanding} alt="" />
      </div>
      <button className="register">
        <Link to="/register">
          <h4>Register</h4>
        </Link>
      </button>
      <button className="register">
        <Link to="/login">
          <h4>Login</h4>
        </Link>
      </button>
    </div>
  );
};

export default LandingPage;
