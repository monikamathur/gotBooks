const { check, validationResult, param } = require('express-validator/check');

let createValidationFor = (route) => {
    switch (route) {
        case 'addBook':
            return [
                check('user_id').not().isEmpty().isLength({ min: 5 }),
                check('password').not().isEmpty().isLength({ min: 4 })
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