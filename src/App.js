import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import Shelf from "./Shelf";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchedBooks: [],
    query: "",
  };
  async componentDidMount() {
    this.fetchAllBooks();
  }
  handleShelfChange = (event, book) => {
    const shelf = event.target.value;
    this.moveBook(shelf, book);
  };
  fetchAllBooks = async () => {
    try {
      const books = await BooksAPI.getAll();
      this.setState({ books });
    } catch (error) {}
  };
  moveBook = async (shelf, book) => {
    try {
      await BooksAPI.update(book, shelf);
      this.fetchAllBooks();
    } catch (error) {}
  };
  searchBooksHandler = async (event) => {
    try {
      const query = event.target.value;
      this.setState({ query });
      const searchedBooks = await BooksAPI.search(query);
      this.setState({ searchedBooks });
    } catch (error) {}
  };

  render() {
    const { books, query, searchedBooks } = this.state;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            onShowShelves={() => this.setState({ showSearchPage: false })}
            query={query}
            searchBooksHandler={this.searchBooksHandler}
            searchedBooks={searchedBooks}
            handleShelfChange={this.handleShelfChange}
          />
        ) : (
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
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
