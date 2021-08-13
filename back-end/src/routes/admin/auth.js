const express = require('express');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const router = express.Router();
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');
const { requireSignin } = require('../../common-middleware');

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/admin/signout', requireSignin, signout);

module.exports = router;

