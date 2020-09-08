import React, { useEffect } from "react";

export default function NominationsList(props: { nominations: any; onRemoveNominate: any; }) {
  const { nominations, onRemoveNominate } = props;

  // useEffect(() => {
  //   console.log('CHANGECHANGE', nominations)
  // }, [nominations])

  return (
    <section className="nominations-list">
      <h3>Nominations</h3>
      {nominations && nominations.map((movie: any, index: number) => {
      //  console.log(movie)

      //  console.log(movie.Title)
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
