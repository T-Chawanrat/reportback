const express = require("express");
const router = express.Router();
const { export01Excel } = require("../controllers/exportExcel-controller");

router.get("/export", export01Excel);

module.exports = router;
