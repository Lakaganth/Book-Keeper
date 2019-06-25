import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Books from "./../books/Books";
import ADD from "./ADDbutton.svg";
import BookFilter from "../books/BookFilter";
import AuthContext from "./../../context/auth/authContext";
import BookContext from "./../../context/book/bookContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { loadUser, user, loading } = authContext;
  const { getBooks } = bookContext;

  useEffect(() => {
    loadUser();

    getBooks();
    console.log(user);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <div className="welcome-msg grid-2">
        <div className="name">
          {user ? <h2>Hi {authContext.user.name} </h2> : <h2>Hi </h2>}
        </div>
        <div className="add-button">
          <Link to="/books/add">
            {" "}
            <img src={ADD} alt="" />
          </Link>
        </div>
      </div>
      <BookFilter />
      <Books />
    </div>
  );
};

export default Home;
