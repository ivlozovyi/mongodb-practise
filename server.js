const express = require('express');
const { ObjectId } = require('mongodb');
const {connectToDb, getDb} = require('./db')

const PORT = 3000;

const app = express();
app.use(express.json());

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
});

const handleError = (res, error) => {
    res.status(500).json({error});
}

app.get('/movies', (req, res) => {
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
        .catch(() => handleError(res, "Something goes wrong..."))
});

app.get('/movies/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        db
        .collection('finish')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((doc) => {
            res
                .status(200)
                .json(doc);
        })
        .catch(() => handleError(res, "Something goes wrong..."))
    }
    else {
        handleError(res, 'Id is not Valid');
    }
})

app.delete('/movies/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        db
        .collection('finish')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."))
    }
    else {
        handleError(res, 'Id is not Valid')
    }
});

app.post('/movies', (req, res) => {
    db
        .collection('finish')
        .insertOne(req.body)
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch('/movies/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        db
        .collection('finish')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body}) 
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."))
    }
    else {
        handleError(res, 'Id is not Valid')
    }
})