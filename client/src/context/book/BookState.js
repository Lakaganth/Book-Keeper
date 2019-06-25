import React, { useReducer } from "react";
import uuid from "uuid";

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
    books: [
      {
        id: uuid.v4(),
        name: "Hello",
        author: "hhsgn",
        genre: "action",
        completed: "true"
      }
    ],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(bookReducer, initiailState);

  // const getBooks = async () => {
  //   try {
  //     const res = await axios.get("/api/books");

  //     dispatch({
  //       type: GET_BOOKS,
  //       payload: res.data
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: BOOK_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  //2. Add Book

  const addBook = async book => {
    dispatch({
      type: ADD_BOOK,
      payload: book
    });
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    // try {
    //   const res = await axios.post("/api/books", book, config);

    //   dispatch({
    //     type: ADD_BOOK,
    //     payload: res.data
    //   });
    // } catch (err) {
    //   dispatch({
    //     type: BOOK_ERROR,
    //     payload: err.response.msg
    //   });
    // }
  };

  // 3. Delete Book

  const deleteBook = id => {
    dispatch({ type: DELETE_BOOK, payload: id });
  };

  //4. Update Book

  const updateBook = book => {
    dispatch({ type: UPDATE_BOOK, payload: book });
  };

  //5.Clear Books

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
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
