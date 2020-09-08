import React from "react";

export default function NominationsList(props: { nominations: any; onRemoveNominate: any; }) {
  const { nominations, onRemoveNominate } = props;

  return (
    <section className="nominations-list">
      <h3>Nominations</h3>
      {nominations && nominations.map((movie: any, index: number) => {
     
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
  )
}
