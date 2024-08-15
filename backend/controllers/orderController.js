const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  const {
    address,
    apt,
    city,
    country,
    email,
    firstName,
    lastName,
    phone,
    state,
    zip,
    deliveryDateTime
  } = req.body;

  if (
    !email ||
    !firstName ||
    !lastName ||
    !phone ||
    !address ||
    !apt ||
    !city ||
    !state ||
    !zip ||
    !country ||
    !deliveryDateTime
  ) {
    throw new Error("Incomplete Data!");
  }
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.serviceId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.serviceId.name,
        },
        unit_amount: item.serviceId.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payment-failed`,
    });

    for (const item of cart.items) {
      const order = new Order({
        userId,
        serviceId: item.serviceId,
        quantity: item.quantity,
        totalAmount: item.serviceId.price * item.quantity,
        stripeSessionId: session.id,
        address,
        apt,
        city,
        country,
        email,
        firstName,
        lastName,
        phone,
        state,
        zip,
        deliveryDateTime
      });
      await order.save();
    }

    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.status(201).json({ checkoutUrl: session.url });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const retryPayment = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId).populate("serviceId");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: order.serviceId.name,
            },
            unit_amount: order.serviceId.price * 100,
          },
          quantity: order.quantity,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payment-failed`,
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkPaymentStatus = async (req, res) => {
  const { session_id } = req.query;

  try {
    const order = await Order.findOne({ stripeSessionId: session_id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      order.paymentStatus = "completed";
      await order.save();
      return res.status(200).json({ status: "success", order });
    } else if (session.payment_status === "unpaid") {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(200).json({ status: "failed", order });
    } else {
      return res.status(200).json({ status: "pending", order });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ userId }).populate("serviceId");

    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        if (order.paymentStatus === "pending") {
          const session = await stripe.checkout.sessions.retrieve(
            order.stripeSessionId
          );

          if (session.payment_status === "paid") {
            order.paymentStatus = "completed";
            await order.save();
          } else if (session.payment_status === "unpaid") {
            order.paymentStatus = "failed";
            await order.save();
          }
        }
        return order;
      })
    );

    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const ServiceProvider = require("../models/serviceProviderModel");
const Service = require("../models/serviceModel");
const Category = require('../models/categoryModel');
const User = require('../models/userModel'); 

const getOrdersForQueue = async (req, res) => {
  try {
   
      const userId = req.user._id;

      
      const serviceProvider = await ServiceProvider.findOne({ employeeId: userId }).populate('category');
      if (!serviceProvider) {
          return res.status(404).json({ error: "Service Provider not found" });
      }

      const services = await Service.find({ category: serviceProvider.category._id });

   
      const serviceIds = services.map(service => service._id);

      
      const orders = await Order.find({
          serviceProvider: '',
          serviceId: { $in: serviceIds }
      }).populate('serviceId');

      res.status(200).json(orders);
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
      const orderId = req.params.id;
      const serviceProviderId = req.user._id; 

      const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { serviceProvider: serviceProviderId },
          { new: true } 
      );

      if (!updatedOrder) {
          return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(updatedOrder);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const getOrdersWithServiceProvider = async (req, res) => {
  try {
   
    const serviceProviderId = req.user._id.toString();

    
    const orders = await Order.find({
      serviceProvider: { $exists: true, $ne: "", $eq: serviceProviderId }
    }).populate('serviceId');

    
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders with service provider:', error);
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  createOrder,
  checkPaymentStatus,
  getAllOrders,
  retryPayment,
  getOrdersForQueue,
  updateOrder,
  getOrdersWithServiceProvider
};
