const express = require('express');
const mongoose = require('mongoose');
const bookRouter = express.Router();
const Book = require('../models/book');
const BookController = require('../controllers/book');

let db;
if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/books_test');
} else {
    db = mongoose.connect('mongodb://localhost/books');
}

bookRouter.route('/')
    .get(BookController.get)
    .post(BookController.post);

bookRouter.route('/:id')
    .get(function (req, res) {
        Book.findById(req.params.id, function (err, book) {
            if (err) {
                res.status(503).send(err);
            } else {
                if (book) {
                    res.json(book);
                } else {
                    res.status(404).send('Book not found!');
                }
            }
        });
    })
    .put(function (req, res) {
        Book.findById(req.params.id, function (err, book) {
            if (err) {
                res.status(503).send(err);
            } else {
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save(function (err, book) {
                    if (err) {
                        res.status(503).send(err);
                    } else {
                        res.json(book)
                    }
                });
            }
        })
    })
    .patch(function (req, res) {
        Book.findById(req.params.id, function (err, book) {
            if (err) {
                res.status(503).send(err);
            } else {
                if (req.body._id) delete req.body._id;
                for (let key in req.body) {
                    book[key] = req.body[key];
                }
                book.save(function (err) {
                    if (err) {
                        res.status(503).send(err);
                    } else {
                        res.json(book)
                    }
                });
            }
        })
    })
    .delete(function (req, res) {
        Book.findById(req.params.id, function (err, book) {
            if (err) {
                res.status(503).send(err);
            } else {
                book.remove(function (err) {
                    if (err) {
                        res.status(503).send(err);
                    } else {
                        res.status(204).send("Book removed!");
                    }
                });
            }
        })
    });

module.exports = bookRouter;
