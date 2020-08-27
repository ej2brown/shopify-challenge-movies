import React, { useState } from "react";
import './App.css';

function App() {

  const [movie, setMovie] = useState('');
  // const [error, setError] = useState("");

  const handleSearchInput = (evt: any) => {
    setMovie(evt.target.value);
  };

  const onSearch = () => {
    console.log(movie)
  }

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
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
    </div>
  );
}

export default App;