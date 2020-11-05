import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    searchedBooks: [],
    query: "",
  };
  async searchBooksHandler(event) {
    const query = event.target.value;
    this.setState({ query });
    const searchedBooks = await BooksAPI.search(query);
    this.setState({ searchedBooks });
  }
  render() {
    const { query, searchedBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.onShowShelves}>
            Close
          </button>
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
              onChange={(event) => this.searchBooksHandler(event)}
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks && searchedBooks.length > 0
              ? searchedBooks.map((book) => <Book book={book} key={book.id} />)
              : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
