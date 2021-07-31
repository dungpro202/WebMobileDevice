const express = require('express');
const { signup, signin } = require('../controllers/auth');
const router = express.Router();
const { validateSignupRequest,validateSigninRequest, isRequestValidated } = require('../validators/auth');


router.post('/signup', validateSignupRequest, isRequestValidated, signup);

router.post('/signin', validateSigninRequest, isRequestValidated, signin);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });


module.exports = router;

