import React, { useState, useEffect } from "react";
import axios from "axios";

//components
import SearchBar from "./components/searchBar";
import ResultsList from "./components/resultsList";
import NominationsList from "./components/nominationsList";

import './App.css';

const APIKEY = process.env.REACT_APP_APIKEY;

export default function App() {

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
    const copy = [...nominations]; // make a separate copy of the array
    const index = copy.map(function(movie) { return movie.imdbID }).indexOf(movie.imdbID);

    if (index !== -1) { // checks if movie has found 
      copy.splice(index, 1);
      setNominations([...copy]);
    }
  }

  useEffect(() => {
    console.log("useEffect change");
    console.log('results', results);
    console.log('nominations', nominations);
  }, [results, nominations]);


  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <SearchBar
        movie={movie}
        handleSearchInput={handleSearchInput}
        onSearch={onSearch} />
      <ResultsList 
      movie={movie} 
      results={results} 
      nominations={nominations}
      onNominate={onNominate} 
      />
      <NominationsList 
      nominations={nominations}
      onRemoveNominate={onRemoveNominate}
            />
    </div>
  );
};