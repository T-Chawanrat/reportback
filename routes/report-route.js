const express = require("express");
const router = express.Router();
const {getTransactionsApp ,getLedit , getVLedit , get01} = require("../controllers/report-controller");

router.get('/app', getTransactionsApp)
router.get('/ledit', getLedit)
router.get('/vledit', getVLedit)
router.get('/01', get01)

module.exports = router;

