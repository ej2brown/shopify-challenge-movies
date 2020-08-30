import React, { useState} from "react";

import axios from "axios";
// const APIKEY = process.env.REACT_APP_APIKEY;
import hardCodedData from "../data/index";

export default function useApplicationData() {
  const [movie, setMovie] = useState('Guardians of the Galaxy Vol. 2'); // for testing 
  const [results, setResults] = useState([] as any);
  const [nominations, setNominations] = useState([] as any);

  const onSearch = () => {
    const queryTitle = querifyString(movie);
    setResults(hardCodedData);
    // axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${queryTitle}`)
    //   .then((response) => {
    //     const result = response.data.Search;
    //     console.log(result);
    //     setResults(result);
    //   })
    //   .catch(error => console.log(error));
  }

  const querifyString = (str: string) => {
    return str.split(' ').reduce((result, word) => { return result + '+' + word });
  }

  const handleSearchInput = (evt: any) => {
    setMovie(evt.target.value);
  };

  const onNominate = (movie: any) => {
    setNominations([movie, ...nominations])
  }

  const onRemoveNominate = (movie: any) => {
    const copy = [...nominations]; // make a separate copy of the array
    const index = copy.map(function(movie) { return movie.imdbID }).indexOf(movie.imdbID);

    if (index !== -1) { // checks if movie has been found 
      copy.splice(index, 1);
      setNominations([...copy]);
    }
  }

  
  return {
    movie,
    results,
    nominations,
    onSearch,
    handleSearchInput,
    onNominate,
    onRemoveNominate
  }
}