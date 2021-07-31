const express = require('express');
const router = express.Router();
const {requireSignin,adminMiddleware}= require('../common-middleware/index')
const CtlCategory = require('../controllers/category');

// Tao moi category
router.post('/category/create',requireSignin,adminMiddleware,CtlCategory.addCategory);
router.get('/category/getcategory',CtlCategory.getCategories);

module.exports = router;