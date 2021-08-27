const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { getListAccount } = require("../../controllers/admin/account.admin");
const router = express.Router();

router.get(`/account/getListAccount`, requireSignin, adminMiddleware, getListAccount);
module.exports = router;