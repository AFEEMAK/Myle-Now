const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const orderSchema = new Schema({
  address: { type: String, required: true },
  apt: { type: String, required: false },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  stripeSessionId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  serviceProvider: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Order", orderSchema);
