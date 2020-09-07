import React, { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(false);

    const user = await fetchUserWithEmail(email);

    if (user) {
      props.setUser(user);
    } else {
      setUserWithEmail(email);
    }
};

// check if email is already saved 
const fetchUserWithEmail = (email: string) => {
  return (
    axios
      .get(`http://localhost:8000/api/users/${email}`)
      .then(res => {
        return res.data;
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
      } else {
        setError(true);
      }
    })
    .catch(error => setError(true));
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
  </Container >
)

} 