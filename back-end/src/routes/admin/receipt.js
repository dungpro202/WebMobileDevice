const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { addReceipt, getAllReceipt } = require("../../controllers/admin/receipt.admin");
const router = express.Router();



router.post(`/receipt/create`, requireSignin, adminMiddleware , addReceipt);
router.get(`/receipt/getAllReceipt`, requireSignin, adminMiddleware , getAllReceipt);

module.exports = router;