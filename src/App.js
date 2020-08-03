import React, { useState, useEffect } from "react";
import './index.css';
import axios from "axios";
import Book from "./components/Books";

const App = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState();
  const [submit, setSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${submit}`)
      .then(res => {
        setBooks(res.data.items);
        console.log(res.data);
        setIsLoading(false);
        setError(false);
      })
      .catch(err => {
        setError(true);
      });
  }, [submit]);

  const updateSeach = e => {
    setSearch(e.target.value);
    console.log(setSearch);
  };

  const getSearch = e => {
    e.preventDefault();
    setSubmit(search);

    setSearch("");
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Google Books</h1>
        <p>Find what you want</p>
      </div> 

      <form onSubmit={getSearch}>
        <input
          className="input-box"
          type="text"
          placeholder="Search for a book"
          value={search}
          onChange={updateSeach}
        />

        <button 
          type="submit"
          className="btn-submit"
        >Search</button>
      </form>

      <div className="results">
        <h2>RESULTS</h2>

        {/* {error && <div>Oops, something went wrong.</div>} */}

        {books && books.length > 0 && (
          books.map(book => (
            <Book
              key={book.id}
              title={book.volumeInfo.title}
              link={book.volumeInfo.infoLink}
              category={book.volumeInfo.categories}
              image={book.volumeInfo.imageLinks.thumbnail}
            />
          ))
        )}
        {!books && (
          <div> <p>Your search did not match any book results.</p> </div>
        )}
      </div>
    </div>
  );
};

export default App;