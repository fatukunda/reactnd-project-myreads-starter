import React from "react";
import Shelf from "./Shelf";

const BooksList = ({ books }) => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <Shelf
            title="Currently Reading"
            books={books.filter((book) => book.shelf === "currentlyReading")}
          />
          <Shelf
            title="Want to Read"
            books={books.filter((book) => book.shelf === "wantToRead")}
          />
          <Shelf
            title="Read"
            books={books.filter((book) => book.shelf === "read")}
          />
        </div>
      </div>
    </div>
  );
};

export default BooksList;
