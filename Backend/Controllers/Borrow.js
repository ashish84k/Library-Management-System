
const { Books } = require("../Models/Books");
const { BorrowedBooks } = require("../Models/BorrowedBooks");
const { authMiddleware } = require("../Middleware/authMiddleware");

// ✅ Borrow a book
const BorrowBook =  async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const book = await Books.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    const alreadyBorrowed = await BorrowedBooks.findOne({
      user: userId,
      book: bookId,
    });
    if (alreadyBorrowed) {
      return res.status(400).json({ message: "You have already borrowed this book" });
    }

    const borrowed = new BorrowedBooks({
      user: userId,
      book: bookId,
    });
    await borrowed.save();

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({ message: "Book borrowed successfully", borrowed });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error: error.message });
  }
};

// ✅ Return a book (delete borrow record)
const BorrowReturnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrowRecord = await BorrowedBooks.findById(borrowId).populate("book");
    if (!borrowRecord) return res.status(404).json({ message: "Borrow record not found" });

    // increment available copies
    borrowRecord.book.availableCopies += 1;
    await borrowRecord.book.save();

    // delete borrow record
    await BorrowedBooks.findByIdAndDelete(borrowId);

    res.status(200).json({ message: "Book returned successfully and record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error: error.message });
  }
};

// ✅ Get all borrowed books by logged-in user
const GetBorrowBook = async (req, res) => {
    
    try {
        const userId = req.user.id;
        console.log('hiii',userId);
    const borrowedBooks = await BorrowedBooks.find({ user: userId })
      .populate("book")
      .sort({ createdAt: -1 });

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowed books", error: error.message });
  }
};

module.exports = { BorrowBook , BorrowReturnBook , GetBorrowBook };
