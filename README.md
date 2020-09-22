<p align="center">
  <a href="https://www.shopify.com/">
    <img alt="Shopify" src="./public/images/shopify-challenge-movies.jpeg" width="60" />
  </a>
</p>
<h1 align="center">
UX Developer Intern & Web Developer Intern Challenge - Winter 2021
</h1>

### The Shoppies: Movie Awards for Entrepreneurs

> A webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

### This app is hosted 👉 [here](https://shoppies-nominations-challenge.netlify.app) 👈 on Netlify! 

[![Netlify Status](https://api.netlify.com/api/v1/badges/24065bd4-6c73-4bbc-8c56-c818ea8e3bf0/deploy-status)](https://app.netlify.com/sites/shoppies-nominations-challenge/deploys)


# Features
- Search OMDB and display the results (movies only)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list
- Save nomination lists if the user leaves the page
- Displays a banner when the user has 5 nominations

# Resources

[Developer Internships & Data Science Internships - Winter 2021](https://www.shopify.com/careers/developer-internships-data-science-internships-winter-2021-826aeb)

[UX Developer Intern & Web Developer Intern Challenge Description](https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit#heading=h.31w9woubunro)

[OMDB's API](http://www.omdbapi.com/apikey.aspx)

## Deployment Links

**Back-end**: [Heroku](https://shoppies-nominations-challenge.herokuapp.com)

**Front-end**: [Netifly](https://shoppies-nominations-challenge.netlify.app)

## Tech Stack

### Front-end
 - React
 - Material-ui

### Back-end
- NodeJS
- ExpressJS
- PostgreSQL

# Getting Started - Front-end Branch

1. Fork this repository, then clone your fork of this repository.

```shell 
git clone git@github.com:ej2brown/shopify-challenge-movies.git
```

1. Install dependencies using the npm install command.
```shell 
npm install // or npm i
```
3. Navigate into the projects directory and run gatsby.

```shell 
npm start
```
1. The app will be served at http://localhost:3000/. Go to http://localhost:3000/ in your browser.

# Getting Started - Back-end Branch
1. Login to Postgres and setup a new local database as a reference:
```shell 
psql
CREATE DATABASE shoppies_nominations;
``` 

2. Create the `.env` by using `.env.example` as a reference: 
```shell 
`cp .env.example .env`
``` 
3. Update the .env file with your correct local information 
  - username: `****` 
  - password: `****` 
  - database: `****`
4. Install dependencies: `npm i`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8000/`
