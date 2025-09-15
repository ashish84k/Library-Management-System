
const { Books } = require("../Models/Books");

// ✅ Add new book
const addBook = async (req, res) => {
  const { title, author, genre, publishedYear, ISBN, availableCopies } = req.body;

  // 🔴 Basic validation
  if (!title || !author || !genre || !publishedYear || !ISBN) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    // Check for duplicate ISBN
    const existingBook = await Books.findOne({ ISBN });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }

    const book = new Books({
      title,
      author,
      genre,
      publishedYear,
      ISBN,
      availableCopies: availableCopies || 1,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

// ✅ Get all books
const GetAllBook = async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

// ✅ Get single book by ID
const GetOneBook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
};

// ✅ Update book by ID
const UpdateBook = async (req, res) => {

  try {
    const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error: error.message });
  }
};

// ✅ Delete book by ID
const DeleteBook = async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};

module.exports = {DeleteBook , GetAllBook , GetOneBook , UpdateBook , addBook };
