const express = require("express");
const router = express.Router();

// @route : GET /api/auth
// @desc : Get user Details
// @access : private

router.get("/", (req, res) => {
  res.send("Input your Credentials");
});

// @route : POST /api/auth
// @desc : Check for the user Credentials and get token
// @access : public

router.post("/", (req, res) => {
  res.send("Get the token");
});

module.exports = router;
