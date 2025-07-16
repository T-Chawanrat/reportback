const express = require("express");
const router = express.Router();
const { export01Excel , export02Excel } = require("../controllers/exportExcel-controller");

router.get("/export01", export01Excel);
router.get("/export02", export02Excel);

module.exports = router;
