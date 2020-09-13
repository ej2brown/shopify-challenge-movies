import React, { useEffect } from "react";
import useApplicationData from "./hooks/useApplicationData";

//components
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import NominationsList from "./components/NominationsList";
import EmailForm from "./components/EmailForm";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

console.log("Hello Shopify Team!! 👋");

export default function App() {

  const {
    movie,
    results,
    nominations,
    user,
    setUser,
    onSearch,
    handleSearchInput,
    onNominate,
    onRemoveNominate,
    fetchUserWithEmail,
    postUserWithEmail,
    fetchNominations,
    postNominations
  } = useApplicationData();

  // sends notification when five movies have been nominated
  const notify = () => {
    toast.success(`You have nominated 5 movies!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // checks nominations count everytime nominations changes
  useEffect(() => {
    if (nominations.length === 5) {
      notify()
    };
  }, [nominations]);

  return (
    <div className="App">
      <header className="header">
        <h1>The Shoppies</h1>
      </header>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      <EmailForm
        user={user}
        setUser={setUser}
        nominations={nominations}
        fetchUserWithEmail={fetchUserWithEmail}
        postUserWithEmail={postUserWithEmail}
        fetchNominations={fetchNominations}
        postNominations={postNominations}
      />
    </div>
  );
};