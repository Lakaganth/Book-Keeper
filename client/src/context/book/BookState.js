import React, { useReducer } from "react";

import bookReducer from "./bookReducer";
import BookContext from "./bookContext";
import axios from "axios";
import {
  GET_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOK,
  CLEAR_BOOKS,
  CLEAR_FILTER,
  BOOK_ERROR
} from "../types";

const BookState = props => {
  const initiailState = {
    books: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(bookReducer, initiailState);

  const getBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      console.log(res);

      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.msg
      });
    }
  };

  //2. Add Book

  const addBook = async book => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/books", book, config);
      console.log(res);
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 3. Delete Book

  const deleteBook = async id => {
    try {
      await axios.delete(`/api/books/${id}`);
      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.msg
      });
    }
  };

  //4. Update Book

  const updateBook = async book => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/books/${book._id}`, book, config);

      dispatch({
        type: UPDATE_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.msg
      });
    }
  };

  //5.Clear Books
  const clearBooks = () => {
    dispatch({ type: CLEAR_BOOKS });
  };

  // 6. Set current book

  const setCurrent = book => {
    dispatch({ type: SET_CURRENT, payload: book });
  };

  //7. Clear current book
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //8. Filter
  const filterBooks = text => {
    dispatch({ type: FILTER_BOOK, payload: text });
  };

  //9. Clear Filter book
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filtered: state.filtered,
        getBooks,
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        clearBooks
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
