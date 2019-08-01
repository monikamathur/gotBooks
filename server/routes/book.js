var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var validator = require('../validation')
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
        message: "Something went wrong please try again."
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
        message: "Something went wrong please try again."
      });
    }
    else {
      bookResponse.data = book;
      return res.status(201).send(bookResponse);
    }
  })
});

router.patch('/', validator.createValidationFor('addBook'), validator.checkValidationResult, (req, res, next) => {
  let newBook = new Book();

  Book.findOne({ id: req.body._id }, function (error, item) {

    if (error) {
      return res.status(400).send({
        message: "Something went wrong please try again."
      });
    } else {
      for (var property in req.body) {
        if (req.body.hasOwnProperty(property)) {
          if (typeof item[property] !== 'undefined') {
            newBook[property] = req.body[property];
          }
        }
      }

      let bookResponse =
      {
        status_code: 201,
        status: "success",
        data: []
      };

      newBook.save((err, book) => {
        if (err) {
          return res.status(400).send({
            message: "Unable to add book."
          });
        }
        else {
          bookResponse.data = book;
          return res.status(201).send(bookResponse);
        }
      })
    }

  });
});

// Api for get Book by id
router.get('/:id', (req, res, next) => {
  let bookResponse =
  {
    status_code: 201,
    status: "success",
    data: []
  };
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.status(400).send({
        message: "Something went wrong please try again."
      });
    }
    else {
      bookResponse.data = book
      return res.status(201).send(bookResponse);
    }
  })
});


router.delete('/:id', (req, res, next) => {
  let bookResponse = {
    "status_code": 200,
    "status": "success",
    "message": "The book My First Book was deleted successfully",
    "data": []
}

  Book.findOneAndDelete({ _id: req.params.id }, (err, Book) => {
    if (err) {
      return res.status(400).send('Something went wrong please try again.');
    }
    else {
      return res.status(201).send(bookResponse);
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
  rp('https://www.anapioficeandfire.com/api/books?name=' + req.params.name).then(body => {
    bookResponse.data = body;
    return res.status(201).send(bookResponse);
  }).catch(err => {
    return res.status(400).send('Something went wrong please try again.');
  });
});
module.exports = router;
