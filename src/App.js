import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };
  async componentDidMount() {
    this.fetchAllBooks();
  }
  fetchAllBooks = async () => {
    try {
      const books = await BooksAPI.getAll();
      this.setState({ books });
    } catch (error) {}
  };
  handleShelfChange = (event, book) => {
    const shelf = event.target.value;
    this.moveBook(shelf, book);
  };
  moveBook = async (shelf, book) => {
    try {
      await BooksAPI.update(book, shelf);
      this.fetchAllBooks();
    } catch (error) {}
  };
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home books={books} handleShelfChange={this.handleShelfChange} />
            )}
          />
          <Route
            path="/search"
            exact
            render={() => <Search shelfBooks={books} />}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
