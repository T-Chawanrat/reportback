const express = require("express");
const router = express.Router();
const {updateEdit, updateRemark} = require("../controllers/function-controller");


router.get('/update', updateEdit)
router.post('/update-remark', updateRemark)


module.exports = router;

