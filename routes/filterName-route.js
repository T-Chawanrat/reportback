const express = require("express");
const router = express.Router();
const {getWarehousesName , getCustomersName} = require("../controllers/filterName-controller");

router.get('/warehouses', getWarehousesName)
router.get('/customers', getCustomersName)

module.exports = router;