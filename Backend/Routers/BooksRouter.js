const express = require("express");
const { Books } = require("../Models/Books");
const {DeleteBook , GetAllBook , GetOneBook , UpdateBook , addBook } = require("../Controllers/Books");
const { authMiddleware } = require("../Middleware/authMiddleware");

const BooksRouter = express.Router();

// ✅ Add new book
BooksRouter.post("/add",authMiddleware(['admin']), addBook);

// ✅ Get all books
BooksRouter.get("/",authMiddleware(), GetAllBook);

// ✅ Get single book by ID
BooksRouter.get("/:id",authMiddleware(), GetOneBook);

// ✅ Update book by ID
BooksRouter.put("/:id",authMiddleware(['admin']), UpdateBook);

// ✅ Delete book by ID
BooksRouter.delete("/:id",authMiddleware(['admin']), DeleteBook);

module.exports = { BooksRouter };
