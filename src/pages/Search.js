import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

class Search extends Component {
  state = {
    searchedBooks: [],
    query: "",
  };

  searchBooksHandler = async (event) => {
    try {
      const query = event.target.value;
      this.setState({ query });
      const searchedBooks = await BooksAPI.search(query);
      this.setState({ searchedBooks });
    } catch (error) {}
  };
  handleShelfChange = (event, book) => {
    const shelf = event.target.value;
    this.moveBook(shelf, book);
  };
  moveBook = async (shelf, book) => {
    try {
      await BooksAPI.update(book, shelf);
    } catch (error) {}
  };
  render() {
    const { query, searchedBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBooksHandler}
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks && searchedBooks.length > 0
              ? searchedBooks.map((book) => (
                  <Book
                    book={book}
                    key={book.id}
                    handleShelfChange={(event) =>
                      this.handleShelfChange(event, book)
                    }
                  />
                ))
              : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
