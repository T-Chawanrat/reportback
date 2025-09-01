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
  get04stdDetail,
  get04outboundDetail,
  get04inboundDetail,
  get04whDetail,
  get05_09,
  get05_11,
  get05_n09n11
} = require("../controllers/report-controller");

router.get("/vledit", getVLedit);
router.get("/01", get01);
router.get("/02", get02);
router.get("/03", get03);
router.get("/04std", get04std);
router.get("/std/:truck_load_id", get04stdDetail);
router.get("/04outbound", get04outbound);
router.get("/outbound/:truck_load_id", get04outboundDetail);
router.get("/04inbound", get04inbound);
router.get("/inbound/:truck_load_id", get04inboundDetail);
router.get("/04wh", get04wh);
router.get("/wh/:truck_load_id", get04whDetail);
// router.get("/05", get05);
// router.get("/05detail/:truck_load_id", get05Detail);
router.get("/05_09", get05_09);
router.get("/05_11", get05_11);
router.get("/05_n09n11", get05_n09n11);

module.exports = router;
