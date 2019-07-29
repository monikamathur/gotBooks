var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book');
const { check, validationResult } = require('express-validator/check');
// var auth = require('../middleware');
var validator = require('../validation')

// Api for get all Candidates
router.get('/', (req, res, next) => {
  Candidate.find({}, (err, candidate) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add candidate."
      });
    }
    else {
      return res.status(201).send(candidate);
    }
  })
});

// Api for Add all Candidate
router.post('/',   validator.createValidationFor('addBook'), validator.checkValidationResult, (req, res, next) => {
  let newBook = new Book();

  // intialize newUser object with request data 
  newBook.candidate_id = req.body.candidate_id;
  newBook.candidate_name = req.body.candidate_name;
  newBook.candidate_sign = req.body.candidate_sign;
  newBook.candidate_party = req.body.candidate_party;

  newBook.save((err, candidate) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add candidate."
      });
    }
    else {
      return res.status(201).send({
        message: "candidate added succesfully."
      });
    }
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
