const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middleware');
const { createAndUpdateSupplier,getAllSupplier } = require('../../controllers/admin/supplier');
const router = express.Router();


// Tao moi NCC
router.post('/supplier/create',requireSignin, adminMiddleware , createAndUpdateSupplier);

router.get('/supplier/getAllSupplier',requireSignin, adminMiddleware , getAllSupplier);

module.exports = router;