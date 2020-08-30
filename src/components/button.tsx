import React, { useState, useEffect } from "react";

export default function Button(props: { children?: any; movie?: any; nominations?: any; onNominate?: any; }) {
  const [disable, setDisable] = useState(false);
  const { movie, nominations, onNominate } = props;

  useEffect(() => {
    if (!nominations.includes(movie.imdbID)) {
      setDisable(false);
    } else{
      setDisable(true);
    }
  }, [movie.imdbID, nominations]);

  const setNominatee = () => {
    // if (!nominations.includes(movie.imdbID)) {
      if (!disable) {
      onNominate(movie)
      setDisable(true);
    };
  };

  return (
    <button
      key={movie.imdbID}
      onClick={() => setNominatee()}
      disabled={disable}
    >
      {props.children}
    </button>
  );
}
