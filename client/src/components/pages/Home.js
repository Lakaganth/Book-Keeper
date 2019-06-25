import React from "react";
import { Link } from "react-router-dom";

import Books from "./../books/Books";
import ADD from "./ADDbutton.svg";
import BookFilter from "../books/BookFilter";

const Home = () => {
  return (
    <div className="container">
      <div className="welcome-msg grid-2">
        <div className="name">
          <h2>Hi Laka</h2>
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
