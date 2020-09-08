// load .env data into process.env
require('dotenv').config();

// Web server configuration
const express      = require("express");
const bodyParser   = require("body-parser");
const app          = express();
const morgan       = require('morgan');
const cors         = require("cors");
const PORT         = process.env.PORT || 8000;

// PG database client/connection configuration
const { Pool } = require('pg');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ENV: process.env.NODE_ENV || "development"
  };
}

const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
