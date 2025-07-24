const express = require("express");
const router = express.Router();
const { export01Excel , export02Excel, export03Excel } = require("../controllers/exportExcel-controller");

router.get("/export01", export01Excel);
router.get("/export02", export02Excel);
router.get("/export03", export03Excel); 

module.exports = router;
