import React, { useContext, useRef, useEffect } from "react";

import BookContext from "./../../context/book/bookContext";

const BookFilter = () => {
  const bookContext = useContext(BookContext);

  const { filterBooks, clearFilter, filtered } = bookContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterBooks(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter through books"
        onChange={onChange}
      />
    </form>
  );
};

export default BookFilter;
