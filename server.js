const express = require('express');
const {connectToDb, getDb} = require('./db')

const PORT = 3000;

const app = express();

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening on port ${PORT}`)
        });
        db = getDb();
    } else {
        console.log(`DB connection error: ${err}`)
    }
})

app.get('/finish', (req, res) => {
    const movies = [];

    db
        .collection('finish')
        .find()
        .sort({title: 1})
        .forEach(movie =>movies.push(movie))
        .then(() => {
            res
                .status(200)
                .json(movies);
        })
        .catch(() => {
            res 
                .status(500)
                .json({err: "Something went wrong..."})
        })
})