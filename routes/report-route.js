const express = require("express");
const router = express.Router();
const {getTransactionsApp ,getLedit , getVLedit , getVProductTransaction, updateEdit ,getIndex , get01} = require("../controllers/report-controller");

router.get('/app', getTransactionsApp)
router.get('/ledit', getLedit)
router.get('/vledit', getVLedit)
router.get('/vproduct', getVProductTransaction)
router.get('/update', updateEdit)
router.get('/vindex', getIndex)
router.get('/01', get01)

module.exports = router;

