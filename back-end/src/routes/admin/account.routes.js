const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { getListAccount, getOrdersByAccountId } = require("../../controllers/admin/account.admin");
const router = express.Router();

router.get(`/account/getListAccount`, requireSignin, adminMiddleware, getListAccount);

//Get orders theo account
router.get("/account/:accountId", requireSignin, adminMiddleware, getOrdersByAccountId);
module.exports = router;