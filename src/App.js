import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
