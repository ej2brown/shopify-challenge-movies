/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bcrypt = require("bcrypt");

const router = express.Router();

module.exports = (db) => {
  const dbHelpers = require("./dbHelpers/helpers.js")(db);

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email or password not entered.  Please <a href='/register'>try again</a>.");
      return;
    }
    db
      .query(
        `
          INSERT INTO users
          (email, password)
          VALUES
          ($1, $2)
          RETURNING *;
        `,
        [
          email,
          bcrypt.hashSync(password, 12),
        ]
      )
      .then(() =>
        res.status(400))
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Invalid credentials. Please <a href='/login'>try again</a>!");
      return;
    }

    dbHelpers
      .authenticateUser(email, password)
      .then(user => {
        console.log(user);
        if (user) {
          res.status(400).send(user);
        } else {
          res.status(400).send("Invalid credentials. Please <a href='/login'>try again</a>!");
        }
      })
      .catch(e => console.error(e));
  });


  //////////////////////
  return router;
  //////////////////////
};
