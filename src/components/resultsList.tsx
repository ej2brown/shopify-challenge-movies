import React from "react";

//components
import Button from "./button";

export default function ResultsList(props: { movie: any; results: any; nominations: any; onNominate: any; }) {
  const { movie, results, nominations, onNominate } = props;

  return (
    <section className="results-list">
    <h3>Results for "{movie}"</h3>
    {results && results.map((movie: any, index: number) => {
      const imdbID = nominations.map(function(movie: any) { return movie.imdbID });

      return (
        <ul key={`${index}`}>
          <li>{movie.Title} ({movie.Year})</li>
          <Button
            onNominate={onNominate}
            movie={movie}
            nominations={imdbID}
          >Nominate</Button>
        </ul>
      )
    })}
  </section>
  )
}
