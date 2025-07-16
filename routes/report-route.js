const express = require("express");
const router = express.Router();
const { get01, get02, getVLedit } = require("../controllers/report-controller");

router.get("/vledit", getVLedit);
router.get("/01", get01);
router.get("/02", get02);

module.exports = router;
