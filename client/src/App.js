import React, { useContext } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import BookState from "./context/book/BookState";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";

import BookForm from "./components/books/BookForm";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import LandingPage from "./components/pages/LandingPage";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";

const App = () => {
  return (
    <AuthState>
      <BookState>
        <AlertState>
          <Router>
            <Navbar />
            <div className="container">
              <Alerts />
            </div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/books/add" component={BookForm} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </AlertState>
      </BookState>
    </AuthState>
  );
};

export default App;
