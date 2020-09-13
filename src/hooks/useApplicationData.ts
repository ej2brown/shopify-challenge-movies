import { useState, useEffect } from "react";

import axios from "axios";
declare var process: {
  env: {
    REACT_APP_APIKEY: string
  }
}

export default function useApplicationData() {
  const [movie, setMovie] = useState('Guardians of the Galaxy Vol. 2'); // for testing 
  const [results, setResults] = useState([] as any);
  const [nominations, setNominations] = useState([] as any);
  const [user, setUser] = useState()

  const onSearch = async () => {
    const queryTitle = querifyString(movie);
    console.log(queryTitle)
    const url = `https://www.omdbapi.com/?s=${queryTitle}&type=movie&apikey=${process.env.REACT_APP_APIKEY}`;
    await axios.get(url)
      .then((response) => {
        const result = response.data.Search;
        console.log(response)
        setResults(result);
      })
      .catch(error => console.log(error));
  }

  const querifyString = (str: string) => {
    return str.split(' ').reduce((result, word) => { return result + '+' + word });
  }

  const handleSearchInput = (evt: any) => {
    setMovie(evt.target.value);
  };

  const onNominate = (movie: any) => {
    setNominations([movie, ...nominations])
  }

  const onRemoveNominate = (movie: any) => {
    const copy = [...nominations]; // make a separate copy of the array
    const index = copy.map(function(movie) { return movie.imdbID }).indexOf(movie.imdbID);

    if (index !== -1) { // checks if movie has been found 
      copy.splice(index, 1);
      setNominations([...copy]);
    }
  }

  // check if email is already saved 
  const fetchUserWithEmail = (email: string) => {
    return (
      axios
        .get(`https://shoppies-nominations-challenge.herokuapp.com/api/users/${email}`)
        .then(res => {
          setUser(res.data);
          return res.data;
        })
        .catch(error => console.log(error))
    )
  }
  // post request to save email 
  const postUserWithEmail = (email: string) => {
    axios
      .post("https://shoppies-nominations-challenge.herokuapp.com/api/users/email", {
        email
      })
      .then(res => {
        if (res.data.isValid) {
          setUser(res.data);
          return res.data;
        }
      })
      .catch(error => console.log(error));
  }

  const fetchNominations = (emailId: number) => {
    axios
      .get(`https://shoppies-nominations-challenge.herokuapp.com/api/users/nominations/${emailId}`)
      .then(res => {
        const nominatedMovies = res.data;
        if (nominatedMovies) {
          nominatedMovies.map((nominatedMovie: any) => {
            // changing to match uppercase keys from api
            const list = {
              id: nominatedMovie.id,
              imdbID: nominatedMovie.imdbId,
              Title: nominatedMovie.title,
              Year: nominatedMovie.year,
              email_id: nominatedMovie.email_id
            }
            return setNominations([...nominations, list]);
          })
        }
        return res.data;
      })
      .catch(error => console.log(error))
  }
  // check if nomination was already saved
  const fetchNomination = (emailId: number, imdbID: string) => {
    return (
      axios
        .get(`https://shoppies-nominations-challenge.herokuapp.com/api/users/nominations/${emailId}/${imdbID}`)
        .then(res => {
          return res.data;
        })
        .catch(error => console.log(error))
    )
  }

  const postNominations = (emailId: number, nominations: any) => {
    nominations.map((movie: any) => {
      return (
        fetchNomination(emailId, movie.imdbID)
          .then(res => {
            if (res.length === 0 || !res) {
              axios
                .post("https://shoppies-nominations-challenge.herokuapp.com/api/users/nominate", {
                  emailId,
                  imdbID: movie.imdbID,
                  Title: movie.Title,
                  Year: movie.Year
                })
            }
          })
          .catch(error => console.log(error))
      )
    })
  }
  useEffect(() => {
  }, [results, nominations, user]);

  return {
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
    fetchNomination,
    postNominations
  }
}