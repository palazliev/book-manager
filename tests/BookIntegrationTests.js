const should = require('should');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD test', function () {
    it('Should allow a book to be posted and return a read and _id', function (done) {
        let bookPost = {
            title: 'new Book',
            author: 'Lev Tolstoy',
            genre: 'Fiction'
        };

        agent.post('/books')
            .send(bookPost)
            .expect(200)
            .end(function (err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    });

    afterEach(function (done) {
        Book.remove().exec();
        done();
    })
});