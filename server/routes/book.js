var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book');
const { check, validationResult } = require('express-validator/check');
// var auth = require('../middleware');
var validator = require('../validation')
const request = require('request');
const rp = require('request-promise');

// Api for get all Books
router.get('/', (req, res, next) => {
  let bookResponse =
  {
    status_code: 200,
    status: "success",
    data: []
  };
  Book.find({}, (err, book) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add book."
      });
    }
    else {
      bookResponse.data = book
      return res.status(201).send(bookResponse);
    }
  })
});

// Api for Add Book
router.post('/', validator.createValidationFor('addBook'), validator.checkValidationResult, (req, res, next) => {
  let newBook = new Book();

  // intialize newUser object with request data 
  newBook.name = req.body.name;
  newBook.isbn = req.body.isbn;
  newBook.authers = req.body.authers;
  newBook.country = req.body.country;
  newBook.number_of_pages = req.body.number_of_pages;
  newBook.publisher = req.body.publisher;
  newBook.release_date = req.body.release_date;

  let bookResponse =
  {
    status_code: 201,
    status: "success",
    data: []
  };

  newBook.save((err, book) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add book."
      });
    }
    else {
      bookResponse.data = book;
      return res.status(201).send(bookResponse);
    }
  })
});

// Api for get Book by id
router.get('/:id', (req, res, next) => {
  Book.findById({ _id: req.params.id }, (err, Book) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add book."
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
      });
    }
  })
});

router.get('/search/:name', (req, res, next) => {
  let bookResponse =
  {
    status_code: 201,
    status: "success",
    data: []
  };
  console.log(req.params.name);

  const rp = require('request-promise');
  rp('https://www.anapioficeandfire.com/api/books?name=' + req.params.name).then(body => {
    bookResponse.data = body;
    // console.log(body);
    return res.status(201).send(bookResponse);
  }).catch(err => {
    console.log(err);
  });
});
module.exports = router;
