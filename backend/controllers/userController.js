const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const role = user.role;
    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verification Email", url);
      }
      return res.status(400).json({
        error:
          "Email Not Verified!. Verification email has been sent to your email address",
      });
    }
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ email, token, role, _id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ error: "Verification email has been sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  if (!req.user) {
    res.status(404).json({ error: "Not Authorized!" });
    return;
  }

  console.log("REq.iser", req.user);
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("auth-token", null).status(200).json("OK!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getMe, logout };
