const Cart = require("../models/cartModel");
const Service = require("../models/serviceModel"); 

const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.serviceId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const userId = req.user._id;
  const { serviceId, quantity } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const cart = await Cart.addItem(userId, serviceId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  const userId = req.user._id;
  const { serviceId } = req.body;

  try {
    const cart = await Cart.removeItem(userId, serviceId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const userId = req.user._id;
  const { serviceId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.serviceId.toString() === serviceId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
};
