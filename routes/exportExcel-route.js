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
  exportVgtExcel,
  exportReceiveNoImageExcel,
  exportMissingV2Excel,
} = require("../controllers/exportExcel-controller");

router.get("/export01", export01Excel);
router.get("/export02", export02Excel);
router.get("/export03", export03Excel);
router.get("/export05", exportMultiSheetV05Excel);
router.get("/export05std", export05stdExcel);
router.get("/export-sla", exportSlaExcel);
router.get("/export-bookings", exportBookingsExcel);
router.get("/export-noimage", exportReceiveNoImageExcel);
router.get("/export-missingv2", exportMissingV2Excel);
router.get("/export-vgt", exportVgtExcel);


module.exports = router;
