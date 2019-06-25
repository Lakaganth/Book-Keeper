import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import BookState from "./context/book/BookState";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import BookForm from "./components/books/BookForm";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <AuthState>
      <BookState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/books/add" component={BookForm} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </BookState>
    </AuthState>
  );
}

export default App;
