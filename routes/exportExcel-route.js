const express = require("express");
const router = express.Router();
const {
  export01Excel,
  export02Excel,
  export03Excel,
  exportMultiSheetV05Excel,
  export05stdExcel,
  exportSlaExcel,
  exportBookingsExcel,
} = require("../controllers/exportExcel-controller");

router.get("/export01", export01Excel);
router.get("/export02", export02Excel);
router.get("/export03", export03Excel);
router.get("/export05", exportMultiSheetV05Excel);
router.get("/export05std", export05stdExcel);
router.get("/exportSla", exportSlaExcel);
router.get("/exportBookings", exportBookingsExcel);

module.exports = router;
