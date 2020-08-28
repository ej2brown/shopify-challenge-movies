import React, { useState, useEffect } from "react";

export default function Button(props: any) {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (!props.nominations.includes(props.movie.imdbID)) {
      setDisable(false);
    } else{
      setDisable(true);
    }
  }, [props.movie.imdbID, props.nominations]);

  const setNominatee = () => {
    // if (!props.nominations.includes(props.movie.imdbID)) {
      if (!disable) {
      props.onNominate(props.movie)
      setDisable(true);
    };
  };

  return (
    <button
      key={props.movie.imdbID}
      onClick={() => setNominatee()}
      disabled={disable}
    >
      {props.children}
    </button>
  );
}
