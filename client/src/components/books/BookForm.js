import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Left from "./LeftArrow.svg";

import BookContext from "./../../context/book/bookContext";
import uuid from "uuid";

const BookForm = () => {
  const bookContext = useContext(BookContext);

  const { addBook, current, clearCurrent, updateBook } = bookContext;

  useEffect(() => {
    if (current !== null) {
      setBook(current);
    } else {
      setBook({
        name: "",
        author: "",
        genre: "",
        completed: ""
      });
    } //eslint-ignore-next-line
  }, [bookContext, current]);

  const [book, setBook] = useState({
    id: uuid.v4(),
    name: "",
    author: "",
    genre: "",
    completed: ""
  });

  const { name, author, genre, completed } = book;

  const onChange = e => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };
  const clearBookForm = () => {
    clearCurrent();
  };

  const returnHome = () => {
    return <Redirect to="/" />;
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addBook(book);

      return <Redirect to="/" />;
    } else {
      updateBook(book);
      clearBookForm();
      returnHome();
    }
  };

  const handleClear = () => {
    clearCurrent();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">{current ? "Edit Book" : "Add Book"}</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={author}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={genre}
          onChange={onChange}
        />
        <h5>Completed</h5>
        <input
          type="radio"
          name="completed"
          value={true}
          checked={completed === "true"}
          onChange={onChange}
        />{" "}
        Yes{" "}
        <input
          type="radio"
          name="completed"
          value={false}
          checked={completed === "false"}
          onChange={onChange}
        />{" "}
        No
        <div>
          <input type="submit" value={current ? "Edit Book" : "Add Book"} />
        </div>
        {current && (
          <div>
            <button className="btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        )}
        <Link to="/" className="back-arrow">
          {" "}
          <img src={Left} alt="" />
        </Link>
      </form>
    </div>
  );
};

export default BookForm;
