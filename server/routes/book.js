var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book');
const { check, validationResult } = require('express-validator/check');
// var auth = require('../middleware');
var validator = require('../validation')

// Api for get all Books
router.get('/', (req, res, next) => {
  Book.find({}, (err, Book) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add candidate."
      });
    }
    else {
      return res.status(201).send(Book);
    }
  })
});

// Api for Add Book
router.post('/',   validator.createValidationFor('addBook'), validator.checkValidationResult, (req, res, next) => {
  let newBook = new Book();

  // intialize newUser object with request data 
  newBook.name = req.body.name;
  newBook.isbn = req.body.isbn;
  newBook.auther = req.body.auther;
  newBook.country = req.body.country;
  newBook.number_of_pages = req.body.number_of_pages;
  newBook.publisher = req.body.publisher;
  newBook.release_date = req.body.release_date;

  newBook.save((err, candidate) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add book."
      });
    }
    else {
      return res.status(201).send({
        message: "Book added succesfully."
      });
    }
  })
});

// Api for get Book by id
router.get('/:id', (req, res, next) => {
  Book.findById({ _id: req.params.id }, (err, Book) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add candidate."
      });
    }
    else {
      return res.status(201).send(Book);
    }
  })
});


router.delete('/:id', (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id }, (err, Book) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to delete book."
      });
    }
    else {
      return res.status(201).send({
        message: "Book deleted succesfully."
      });    }
  })
});
// Api for increment number of vote by 1
router.put('/vote', validator.checkValidationResult, (req, res, next) => {
    Book.find({ user_id: req.body.user_id }, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to get user"
      });
    }
    if (!user.length) {
      return res.status(400).send({
        message: "User not found"
      });
    } else if (user && !user[0].is_voted) {
        Book.update({ candidate_id: req.body.candidate_id }, { $inc: { candidate_vote: 1 } }, (err, candidate) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to vote candidate."
          });
        }
        else {
            Book.update({ user_id: req.body.user_id }, { $set: { is_voted: true } }, (err, user) => {
            if (err) {
              return res.status(400).send({
                message: "Failed to vote candidate."
              });
            }
            else {
              return res.status(201).send({
                message: "vote succesfully."
              });
            }
          })
        }
      })
    } else {
      return res.status(400).send({
        message: "You have already voted"
      });
    }
  })
});
module.exports = router;
