import React, { useState } from "react";
import axios from "axios";

import './App.css';

const APIKEY = process.env.REACT_APP_APIKEY;

function App() {

  const [movie, setMovie] = useState('');
  const [results, setResults] = useState({});

  const handleSearchInput = (evt: any) => {
    setMovie(evt.target.value);
  };

  const onSearch = () => {
    const queryTitle = querifyString(movie);
    axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&t=${queryTitle}`)
      .then((response) => {
        console.log(response)
        setResults(response.data)
      })
      .catch(error => console.log(error))
  }

  const querifyString = (str: string) => {
    return str.split(' ').reduce((result, word) => { return result + '+' + word })
  }


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className="movie-input">
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
      </section>
    </div>
  );
}

export default App;