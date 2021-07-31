
const { check,validationResult } = require('express-validator');


// mang ktra loi
exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('LastName is required'),
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password is  more 6 character'),
];

exports.validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password is more 6 character'),
];

//tra ve ket qua loi
exports.isRequestValidated =(req,res,next)=>{
    const errors = validationResult(req);

    if(errors.array().length > 0){
        return res.status(400).json({ sumerrr:errors.array().length ,errors:errors.array()[0].msg });
    }
    // ko co mang loi ->next
    next();
}