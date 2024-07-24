const express = require("express");
const {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getCart);
router.post("/add", addItemToCart);
router.put("/update", updateCartItemQuantity);

router.post("/remove", removeItemFromCart);

module.exports = router;
