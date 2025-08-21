const express = require("express");
const router = express.Router();
const { getDashboard03std, getDashboard04,  } = require("../controllers/dashboard-controller");

router.get("/dashboard03std", getDashboard03std);
router.get("/dashboard04", getDashboard04);

module.exports = router;
