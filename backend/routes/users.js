/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/:email", (req, res) => {
    const email = req.params.email;
    console.log(email);
    db
      .query(
        `SELECT * FROM emails
          WHERE email= $1;
        `,
        [email]
      )
      .then(data => {
        const users = data.rows[0];
        console.log(users);
        res.json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/save", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ isValid: false, error: "Email not entered." });
    }
    db
      .query(
        `
          INSERT INTO emails
          (email)
          VALUES
          ($1)
          RETURNING *;
        `,
        [email]
      )
      .then(() => {
        res.status(400).json({ isValid: true });
      })
      .catch(err => {
        res.status(500).json({ isValid: false, error: err.message });
      });
  });

  //////////////////////
  return router;
  //////////////////////
};
