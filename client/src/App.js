import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import BookState from "./context/book/BookState";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import BookForm from "./components/books/BookForm";

function App() {
  return (
    <BookState>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/books/add" component={BookForm} />
        </Switch>
      </Router>
    </BookState>
  );
}

export default App;
