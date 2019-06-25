import React, { useContext } from "react";
import BookConext from "../../context/book/bookContext";
import BookItem from "./BookItem";

const Books = () => {
  const bookConext = useContext(BookConext);
  const { books, filtered } = bookConext;

  if (books !== null && books.length === 0) {
    return <h4>Please add a Book</h4>;
  }

  return (
    <div className="book-cards">
      {filtered !== null
        ? filtered.map(book => <BookItem key={book.id} book={book} />)
        : books.map(book => <BookItem key={book.id} book={book} />)}
    </div>
  );
};

export default Books;
