const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const movieRouter = require('./routes/movie-routes');

const PORT = 3000;
const URL = 'mongodb://localhost:27017/mongoPractise';

const app = express();
app.use(express.json());
app.use(movieRouter);

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`))

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening on port ${PORT}`)
});
