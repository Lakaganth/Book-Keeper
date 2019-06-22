const express = require("express");
const router = express.Router();

// @route : GET /api/books
// @desc : Get all books stored by the user
// @access : private

router.get("/", (req, res) => {
  res.send("Get all your books");
});

// @route : POST /api/books
// @desc : POst new books via the form
// @access : private

router.post("/", (req, res) => {
  res.send("POst a new book");
});
// @route : PUT /api/books
// @desc : UPDATE a existing book
// @access : private

router.put("/:id", (req, res) => {
  res.send("update existing book");
});
// @route : DELETE /api/books
// @desc : Delete a book
// @access : private

router.delete("/:id", (req, res) => {
  res.send("delete a book");
});

module.exports = router;
