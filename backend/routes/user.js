const express = require("express");
const User = require("../models/userModel");
const Token = require("../models/token");

const router = express.Router();

const {
  loginUser,
  signupUser,
  getMe,
  logout,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/me", requireAuth, getMe);
router.get("/logout", logout);

router.get("/users/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(req.params.id);
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log('TOKEN:',token)
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }else{

      user.verified = true;
      await user.save();
    }
    res.status(200).send({ message: "Email verified successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
