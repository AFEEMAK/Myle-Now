const express = require("express");
const {
  createOrder,
  checkPaymentStatus,
  getAllOrders,
  retryPayment,
  getOrdersForQueue,
  updateOrder,
  getOrdersWithServiceProvider
} = require("../controllers/orderController");

const bodyParser = require("body-parser");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllOrders);
router.post("/", createOrder);
router.put("/", retryPayment);
router.get("/check-payment-status", checkPaymentStatus);
router.get("/orders-queue", getOrdersForQueue);
router.put('/order/:id', updateOrder); 
router.get("/orders-with-service-provider", getOrdersWithServiceProvider);


module.exports = router;


