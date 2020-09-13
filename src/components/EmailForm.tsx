import React, { useState } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";

export default function LoginForm(props: any) {
  const [email, setEmail] = useState("alice@gmail.com");
  const [error, setError] = useState(false);

  const {
    nominations,
    user,
    setUser,
    fetchUserWithEmail,
    postUserWithEmail,
    fetchNominations,
    postNominations
  } = props;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(false);

    const user = await fetchUserWithEmail(email);
    if (!user) {
      postUserWithEmail(email);
    } else {
      setUser(user);
    }
  };

  return (
    <Container className="email-form">
      <Typography component="h4" variant="h6">
        Get/Save Your Nominations!
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
      {user && <Button variant="outlined" fullWidth color="primary" onClick={() => fetchNominations(user.id)}>fetch your nominations</Button>}
      {user && <Button variant="outlined" fullWidth color="primary" onClick={() => postNominations(user.id, nominations)}>set your nominations</Button>}
    </Container >
  )
}