const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const Book = require("../models/Book");

const auth = require("../middleware/auth");

// @route : GET /api/books
// @desc : Get all books stored by the user
// @access : private

router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ date: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.staus(400).json({ msg: "server Error" });
  }
});

// @route : POST /api/books
// @desc : POst new books via the form
// @access : private

router.post(
  "/",
  auth,
  [
    check("name", "Name of the book is Required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, author, genre, completed } = req.body;

    try {
      const newBook = new Book({
        name,
        author,
        genre,
        completed,
        user: req.user.id
      });

      const book = await newBook.save();

      res.json(book);
    } catch (err) {
      console.error(err);
      res.staus(400).json({ msg: "server Error" });
    }
  }
);

// @route : PUT /api/books
// @desc : UPDATE a existing book
// @access : private

router.put("/:id", auth, async (req, res) => {
  const { name, author, completed, genre } = req.body;
  const bookFields = {};

  if (name) bookFields.name = name;
  if (author) bookFields.author = author;
  if (genre) bookFields.genre = genre;
  if (completed) bookFields.completed = completed;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400).json({ msg: "Book not found" });
    }

    if (book.user.toString() !== req.user.id) {
      res.status(400).json({ msg: "Not authorized" });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: bookFields },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    console.error(err);
    res.staus(400).json({ msg: "server Error" });
  }
});
// @route : DELETE /api/books
// @desc : Delete a book
// @access : private

router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400).json({ msg: "Book not found" });
    }

    if (book.user.toString() !== req.user.id) {
      res.status(400).json({ msg: "Not authorized" });
    }
    await Book.findByIdAndRemove(req.params.id);

    res.json({ msg: "Book deleted" });
  } catch (err) {
    console.error(err);
    res.staus(400).json({ msg: "server Error" });
  }
});

module.exports = router;
