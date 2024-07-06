const express = require('express');
const User = require('../models/userModel');
const Token = require('../models/token');

const router = express.Router();

const { loginUser, signupUser } = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/signup', signupUser);

router.get("/users/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(req.params.id)
    if (!user) {return res.status(400).send({ message: "Invalid link" })};

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if (!token) {return res.status(400).send({ message: "Invalid link" })};

    user.verified = true;
    await user.save();
    await token.remove();
    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
