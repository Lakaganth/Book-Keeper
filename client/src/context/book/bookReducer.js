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

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };

    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        )
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER_BOOK:
      return {
        ...state,
        filtered: state.books.filter(book => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            book.name.match(regex) ||
            book.author.match(regex) ||
            book.genre.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
