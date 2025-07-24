const express = require("express");
const router = express.Router();
const { get01, get02, get03, getVLedit } = require("../controllers/report-controller");

router.get("/vledit", getVLedit);
router.get("/01", get01);
router.get("/02", get02);
router.get("/03", get03);

module.exports = router;
