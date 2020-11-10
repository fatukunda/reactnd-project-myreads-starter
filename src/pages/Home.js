import React, { Component } from "react";
import Shelf from "../components/Shelf";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

class Home extends Component {
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books">
          <div className="list-books-content">
            <div>
              <Shelf
                title="Currently Reading"
                books={books.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
                handleShelfChange={this.handleShelfChange}
              />
              <Shelf
                title="Want to Read"
                books={books.filter((book) => book.shelf === "wantToRead")}
                handleShelfChange={this.handleShelfChange}
              />
              <Shelf
                title="Read"
                books={books.filter((book) => book.shelf === "read")}
                handleShelfChange={this.handleShelfChange}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
