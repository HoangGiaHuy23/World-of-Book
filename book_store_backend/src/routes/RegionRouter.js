const express = require("express");
const RegionController = require("../controllers/RegionController");
const router = express.Router()

router.get('/get-all-province', RegionController.getAllProvince)
router.get('/get-all-district', RegionController.getAllDistrict)
router.get('/get-all-ward', RegionController.getAllWard)

module.exports = router