const express = require("express");
const { Books } = require("../Models/Books");
const { BorrowedBooks } = require("../Models/BorrowedBooks");
const { BorrowBook , BorrowReturnBook , GetBorrowBook } = require("../Controllers/Borrow");
const { authMiddleware } = require("../Middleware/authMiddleware");

const BorrowRouter = express.Router();

// ✅ Borrow a book
BorrowRouter.post("/:bookId",authMiddleware(), BorrowBook);

// ✅ Return a book (delete borrow record)
BorrowRouter.post("/return/:borrowId",authMiddleware(), BorrowReturnBook);

// ✅ Get all borrowed books by logged-in user
BorrowRouter.get("/my",authMiddleware(), GetBorrowBook);

module.exports = { BorrowRouter };
