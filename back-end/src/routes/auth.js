const express = require('express');
const { signup, signin, requireSignin } = require('../controllers/auth');
const { } = require('express-validator');
const router = express.Router();



router.post('/signup', [
    check('firstName')
    .isEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .isEmpty()
    .withMessage('LastName is required'),
    check('email')
    .isEmail()
    .withMessage('Email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password is required and more 6 character'),
], signup);

router.post('/signin', signin);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });


module.exports = router;

