var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: false
    },
    auther: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    number_of_pages: {
        type: Number,
        default: 0,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    }
}, { emitIndexErrors: true });

/**
 * handleE11000 is a method to retuen an error if duplicate entry
 */
var handleE11000 = function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
};
// BookSchema.post('insertMany', handleE11000);
// BookSchema.post('save', handleE11000);
// BookSchema.post('update', handleE11000);
// BookSchema.post('findOneAndUpdate', handleE11000);

var Book = mongoose.model('Book', BookSchema);
module.exports = Book;