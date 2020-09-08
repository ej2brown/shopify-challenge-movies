import React, { useState } from "react";
import axios from "axios";
import useApplicationData from "../hooks/useApplicationData";
import hardCodedData from "../data/index";

import {
  Container,
  Typography,
  TextField,
  Link,
  Button,
  Grid,
} from "@material-ui/core";


export default function LoginForm(props: any) {
  const [email, setEmail] = useState("alice@gmail.com")
  const [error, setError] = useState(false)
  const { nominations } = props;

  const {
    movie,
    results,
    // nominations,
    onSearch,
    handleSearchInput,
    onNominate,
    onRemoveNominate
  } = useApplicationData();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(false);

    const user = await fetchUserWithEmail(email);

    if (!user) {
      setUserWithEmail(email);
    }
  };

  // check if email is already saved 
  const fetchUserWithEmail = (email: string) => {
    return (
      axios
        .get(`http://localhost:8000/api/users/${email}`)
        .then(res => {
          props.setUser(res.data);
          return true;
        })
        .catch(error => setError(true))
    )
  }

  // post request to save email 
  const setUserWithEmail = (email: string) => {
    axios
      .post("http://localhost:8000/api/users/email", {
        email
      })
      .then(res => {
        if (res.data.isValid) {
          props.setUser(res.data);
        } else {
          setError(true);
        }
      })
      .catch(error => setError(true));
  }

  const fetchNominations = () => {
    // const emailId = props.user.emailId
    const emailId = '1'

    if (props.user) {
      return (
        axios
          .get(`http://localhost:8000/api/users/nominations/${emailId}`)
          .then(res => {
            console.log(res.data);
            return true;
          })
          .catch(error => setError(true))
      )
    }
  }
  const fetchNomination = (imdbId: string) => {
    const emailId = '1'

    return (
      axios
        .get(`http://localhost:8000/api/users/nominations/${emailId}/${imdbId}`)
        .then(res => {
          console.log("User Nominations: ", res.data)
          return res.data;
        })
        .catch(error => setError(true))
    )
  }
  const setNominations = () => {
    const emailId = '1'
    nominations.map((movie: any) => {
      fetchNomination(movie.imdbID)
        .then(res => {
          console.log(res)
          if (res.length === 0 || !res) {
            axios
              .post("http://localhost:8000/api/users/nominate", {
                emailId,
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year
              })
          }
        })
        .catch(error => {
        console.log('error')  
          setError(true)
        });
    })
  }


  return (
    <Container>
      <Typography component="h4" variant="h5">
        Get/Save Your Nominations With Your Email Credentials
        </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              variant="outlined"
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary">Submit</Button>
      </form>
      {error && <div>The email provided was incorrect!</div>}
      <button onClick={fetchNominations}>fetch your nomination</button>
      <button onClick={setNominations}>set your nomination</button>

    </Container >
  )

} 