const express = require("express");
const router = express.Router();
const {getTransactions, getTransactionsApp ,getLedit ,getReport} = require("../controllers/report-controller");

router.get('/report', getTransactions)
router.get('/app', getTransactionsApp)
router.get('/ledit', getLedit)
router.get('/getreport' , getReport)

module.exports = router;