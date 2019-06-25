const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const auth = require("../middleware/auth");

// @route : GET /api/auth
// @desc : Get user Details
// @access : private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.staus(400).json({ msg: "server Error" });
  }
});

// @route : POST /api/auth
// @desc : Check for the user Credentials and get token
// @access : public

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Enter password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.send(token);
        }
      );
    } catch (err) {
      console.error(err);
      res.staus(400).json({ msg: "server Error" });
    }
  }
);

module.exports = router;
