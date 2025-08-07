const express = require("express");
const router = express.Router();
const {
  getVLedit,
  get01,
  get02,
  get03,
  get04std,
  get04outbound,
  get04inbound,
  get04wh,
} = require("../controllers/report-controller");

router.get("/vledit", getVLedit);
router.get("/01", get01);
router.get("/02", get02);
router.get("/03", get03);
router.get("/04std", get04std);
router.get("/04outbound", get04outbound);
router.get("/04inbound", get04inbound);
router.get("/04wh", get04wh);

module.exports = router;
