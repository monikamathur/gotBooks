const { check, validationResult, param } = require('express-validator/check');

let createValidationFor = (route) => {
    switch (route) {
        case 'addBook':
            return [
                check('name').not().isEmpty(),
                check('isbn').not().isEmpty().isLength({ min: 4 }),
                check('authers').not().isEmpty(),
                check('country').not().isEmpty(),
                check('number_of_pages').not().isEmpty(),
                check('publisher').not().isEmpty(),
                check('release_date').not().isEmpty(),
            ];
        default:
            return [];
    }
}

let checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.status(422).json({ errors: result.array() });
}

module.exports = {
    createValidationFor, checkValidationResult
}