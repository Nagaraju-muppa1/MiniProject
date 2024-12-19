const { check, 
    validationResult 
} = require('express-validator');

// Declare the arrays with const
validateSignUpRequest = [
    check('firstname').notEmpty().withMessage("First Name is required."),
    check('lastname').notEmpty().withMessage("Last Name is required."),
    check('email').isEmail().withMessage("Incorrect Email"),
    check('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
];

 validateSignInRequest = [
    check('email').isEmail().withMessage("Incorrect Email"),
    check('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
];

isRequestCorrect = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
            errors: errors.array(),
        })
    }

    // Proceed to the next middleware if validation passed
    next();
};

module.exports = {
    validateSignUpRequest,
    validateSignInRequest,
    isRequestCorrect
};
