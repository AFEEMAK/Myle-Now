const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

cartSchema.statics.addItem = async function (userId, serviceId, quantity) {
  if (!userId || !serviceId || !quantity) {
    throw Error("All Fields Must Be Filled");
  }

  let cart = await this.findOne({ userId });
  if (!cart) {
    cart = new this({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex((item) =>
    item.serviceId.equals(serviceId)
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ serviceId, quantity });
  }

  await cart.save();
  return cart;
};

cartSchema.statics.removeItem = async function (userId, serviceId) {
  if (!userId || !serviceId) {
    throw Error("All Fields Must Be Filled");
  }

  const cart = await this.findOne({ userId });

  if (!cart) {
    throw Error("Cart Not Found");
  }

  const itemIndex = cart.items.findIndex((item) =>
    item.serviceId.equals(serviceId)
  );
  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
  }

  return cart;
};

module.exports = mongoose.model("Cart", cartSchema);
