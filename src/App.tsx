import React, { useState, useEffect } from "react";
import axios from "axios";

import './App.css';

const APIKEY = process.env.REACT_APP_APIKEY;

function App() {

  const [movie, setMovie] = useState('Guardians of the Galaxy Vol. 2'); // for testing 
  const [results, setResults] = useState([] as any);
  const [nominations, setNominations] = useState([] as any);

  const handleSearchInput = (evt: any) => {
    setMovie(evt.target.value);
  };

  const onSearch = () => {
    const queryTitle = querifyString(movie);
    axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${queryTitle}`)
      .then((response) => {
        const result = response.data.Search;
        console.log(result);
        // setResults(result, ...results);
        setResults(result);
      })
      .catch(error => console.log(error));
  }

  const querifyString = (str: string) => {
    return str.split(' ').reduce((result, word) => { return result + '+' + word });
  }

  const onNominate = (movie: any) => {
    setNominations([movie, ...nominations])
  }

  const onRemoveNominate = (movie: any) => {
    nominations.find((value: { imdbID: any; }, index: React.Key) => {
      if (movie.imdbID === value.imdbID) {
        console.log('Deleting nomination of:', index, nominations[index]);
        nominations.splice(index, 1);
        console.log(nominations)
        setNominations(nominations)

      }
    })
    // setNominations([nominations, ...nominations])
  }

  useEffect(() => {
  }, [results, nominations]);


return (
  <div className="App">
    {/* <header className="App-header">
      </header> */}
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
            <button onClick={() => {
              onNominate(movie);
            }}>Nominate</button>
          </ul>
        )
      })}
    </section>
    <section className="movie-nominations">
      {nominations.map((movie: any, index: number) => {
        return (
          <ul key={`${index}`}>
            <li>{movie.Title} ({movie.Year})</li>
            <button onClick={() => {
              onRemoveNominate(movie);
            }}>Remove</button>
          </ul>
        )
      })}
    </section>
  </div>
);
}

export default App;