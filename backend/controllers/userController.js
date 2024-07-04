const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex")
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verification Email", url);
      }
      return res.status(400).send({ message: "Verification email has been sent to your email address" });
    }

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
