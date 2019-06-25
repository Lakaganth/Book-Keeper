import React, { useContext, useEffect } from "react";
import BookContext from "../../context/book/bookContext";
import BookItem from "./BookItem";

const Books = () => {
  const bookContext = useContext(BookContext);
  const { books, filtered, getBooks, loading } = bookContext;

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  if (books !== null && books.length === 0) {
    return <h4>Please add a Book</h4>;
  }

  return (
    <div className="book-cards">
      {books !== null && !loading ? (
        filtered !== null ? (
          filtered.map(book => <BookItem key={book._id} book={book} />)
        ) : (
          books.map(book => <BookItem key={book._id} book={book} />)
        )
      ) : (
        <div>
          <h2>Hello</h2>
        </div>
      )}
    </div>
  );
};

export default Books;
