const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router()

router.post('/create', OrderController.createOrder)
router.get('/get-all', OrderController.getAllOrder)

module.exports = router