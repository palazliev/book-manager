const should = require('should');
const sinon = require('sinon');

describe('Book Controller Tests:', function () {
    describe('POST', function () {
        it('Should not allow an empty title.', function () {
            let req = {
                body: {
                    author: 'Author Name'
                }
            };
            let res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            const BookController = require('../controllers/book');
            BookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
});