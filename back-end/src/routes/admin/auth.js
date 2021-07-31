const express = require('express');
const { signup, signin } = require('../../controllers/admin/auth');
const router = express.Router();
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');




router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);


module.exports = router;

