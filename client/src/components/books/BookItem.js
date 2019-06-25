import React, { useContext } from "react";
import { Link } from "react-router-dom";
import rightArrow from "./RightArrow.svg";
import BookContext from "./../../context/book/bookContext";

const BookItem = ({ book }) => {
  const { id, name, author, genre, completed } = book;
  const bookConext = useContext(BookContext);
  const { deleteBook, setCurrent, clearCurrent } = bookConext;
  const handleDel = () => {
    deleteBook(id);
    clearCurrent();
  };
  const handleEdit = () => {
    setCurrent(book);
  };

  return (
    <div className="book-card">
      <div className="grid-2">
        <div className="card-container py-2">
          <h2>{name}</h2>
          <h4 className="py-1">{author}</h4>
        </div>
        <div>
          <a href="#" className="del" onClick={handleDel}>
            {" "}
            <i className="far fa-times-circle delete fa-1x" />
          </a>

          <div className="card-container py-2">
            <p>{genre}</p>
            <h5>
              Completed:{" "}
              {completed === "true" ? (
                <i className="far fa-check-circle p-1" />
              ) : (
                <i className="far fa-circle p-1" />
              )}{" "}
            </h5>
          </div>
          <Link to="/books/add" onClick={handleEdit}>
            {" "}
            <img src={rightArrow} className="edit " alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
