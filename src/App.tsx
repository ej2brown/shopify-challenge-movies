import React, { useState } from "react";
import axios from "axios";

import './App.css';

const APIKEY = process.env.REACT_APP_APIKEY;

function App() {

  const [movie, setMovie] = useState('Guardians of the Galaxy Vol. 2'); // for testing 
  const [results, setResults] = useState([] as any);

  const handleSearchInput = (evt: any) => {
    setMovie(evt.target.value);
  };

  const onSearch = () => {
    const queryTitle = querifyString(movie);
    axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${queryTitle}`)
      .then((response) => {
        const result = response.data.Search;
        console.log(result);
        // setResults({result, ...results});
        setResults(result);
      })
      .catch(error => console.log(error));
  }

  const querifyString = (str: string) => {
    return str.split(' ').reduce((result, word) => { return result + '+' + word });
  }


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className="movie-input">
        Movie Title
        <form>
          <input
            placeholder="Enter Movie Title"
            value={movie}
            onChange={handleSearchInput}
          >
          </input>
        </form>

        <button
          onClick={() => {
            onSearch();
          }}
        >
          Search
        </button>
      </section>
      <section className="movie-results">
        <h3>Results for "{movie}"</h3>
        {results.map((movie: any, index: number) => {
          return (
            <ul key={`${index}`}>
              <li>{movie.Title} ({movie.Year})</li>
            </ul>
          )
        })}
      </section>
    </div>
  );
}

export default App;