import React from "react";

export default function SearchBar(props: { movie: any; handleSearchInput: any; onSearch: any; }) {
  const { movie, handleSearchInput, onSearch } = props;

  return (
    <section className="movie-input">
      Movie Title
      <form>
      <span className="material-icons">
search
</span>
        <input
          placeholder="Enter Movie Title"
          value={movie}
          onChange={handleSearchInput}
        >
        </input>
      </form>
      <button
        onClick={() => onSearch()}
      >
        Search
    </button>
    </section>
  )
}