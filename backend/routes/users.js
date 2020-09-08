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


  router.get("/nominations/:emailId", (req, res) => {
    const emailId = req.params.emailId;
    console.log(emailId);
    db
      .query(
        `SELECT * FROM nominations
          WHERE email_id=$1;
        `,
        [emailId]
      )
      .then(data => {
        const nominations = data.rows;
        res.json(nominations);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/nominate", (req, res) => {
    const { emailId, imdbID, Title, Year } = req.body;
    if (!emailId) {
      return res.status(400).send({ isValid: false, error: "User not found." });
    }
    db
      .query(
        `
          INSERT INTO nominations
          (email_id, imdbID, title, year)
          VALUES
          ($1, $2, $3, $4)
          RETURNING *;
        `,
        [emailId, imdbID, Title, Year]
      )
      .then(() => {
        res.status(200).json({ isValid: true });
      })
      .catch(err => {
        res.status(500).json({ isValid: false, error: err.message });
      });
  });

  router.get("/nominations/:emailId/:imdbId", (req, res) => {
    const emailId = req.params.emailId;
    const imdbId = req.params.imdbId;
    db
      .query(
        `SELECT * FROM nominations
         WHERE email_id=$1 AND imdbid=$2;
        `,
        [emailId, imdbId]
      )
      .then(data => {
        console.log(data);
        if (data.rows) {
          return res.json(data.rows);
        } else {
          return null;
        }
      })
      .catch(err => {
        res
          .status(200)
          .json({ error: err.message });
      });
  });

  //////////////////////
  return router;
  //////////////////////
};
