const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

// @route : POST /api/users
// @desc : Register a new user
// @access : public

router.post(
  "/",
  [
    check("name", "Please add a name")
      .not()
      .isEmpty(),
    check("email", "Please add an email").isEmail(),
    check("password", "Please enter password min 6 character").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: "User Alredy exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          res.json(token);
        }
      );
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
