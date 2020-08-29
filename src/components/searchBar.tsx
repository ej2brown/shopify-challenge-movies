import React from "react";

export default function SearchBar(props: { movie: any; handleSearchInput: any; onSearch: any; }) {
  const { movie, handleSearchInput, onSearch } = props;

  return (
    <section className="search-bar">
      <h3>Movie Title</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSearch()
        }}

      >
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
      {/* <button
        onClick={() => onSearch()}
      >
        Search
    </button> */}
    </section>
  )
}