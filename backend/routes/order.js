const express = require("express");
const {
  createOrder,
  checkPaymentStatus,
  getAllOrders,
  retryPayment,
} = require("../controllers/orderController");
const bodyParser = require("body-parser");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllOrders);
router.post("/", createOrder);
router.put("/", retryPayment);
router.get("/check-payment-status", checkPaymentStatus);

module.exports = router;
