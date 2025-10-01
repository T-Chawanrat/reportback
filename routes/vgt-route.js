const express = require("express");
const router = express.Router();
const { getVGT } = require("../controllers/vgt-controller");

router.get("/vgt", getVGT);

module.exports = router;
