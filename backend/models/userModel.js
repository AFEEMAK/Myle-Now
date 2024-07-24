const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Token = require("./token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "customer",
  },
});

// Static sign up method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Must Be Filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email Is Not Valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password Not Strong Enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email Already In Use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
  await sendEmail(user.email, "Verification Email", url);

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Must Be Filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
