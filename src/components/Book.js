import React from "react";

const Book = ({
  book,
  handleShelfChange,
  shelfBooks,
  isSearchedBooks,
}) => {
  let bookAuthors = "";
  if (book.authors) {
    book.authors.forEach((author) => {
      bookAuthors += author;
    });
  }
  if (isSearchedBooks) {
    const shelfBook = shelfBooks.find((shelfBook) => shelfBook.id === book.id);
    if (shelfBook) {
      book.shelf = shelfBook.shelf;
    }
  }
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book && book.imageLinks && book.imageLinks.thumbnail
                  ? book.imageLinks.thumbnail
                  : ""
              })`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf || "none"}
              onChange={(event) => handleShelfChange(event, book)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.length > 0 ? bookAuthors : null}
        </div>
      </div>
    </li>
  );
};

export default Book;
