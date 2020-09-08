import React, { useState, useEffect } from "react";
import useApplicationData from "./hooks/useApplicationData";

//components
import SearchBar from "./components/searchBar";
import ResultsList from "./components/resultsList";
import NominationsList from "./components/nominationsList";
import EmailForm from "./components/EmailForm";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

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

  // useEffect(() => {
  //   console.log("APP HAS CHANGE", nominations)
  //   if (nominations.length === 3) {
  //     notify()
  //   };
  // }, [results, nominations, user]);

  return (
    <div className="App">
      <header className="App-header">
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