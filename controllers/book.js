const Book = require('../models/book');

class BookController {
    static get (req, res) {
        let query = {};
        if (req.query.author) {
            query.author = req.query.author;
        }
        Book.find(query, function(err, books) {
            if (err) {
                res.status(503).send(err);
            } else {
                res.json(books);
            }
        });
    }
    static post (req, res) {
        let book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required')
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    }
}

module.exports = BookController;