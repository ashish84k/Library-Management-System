const mongoose = require("mongoose");

const BorrowedBookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",   // User reference
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",   // Book reference
      required: true,
    },
    borrowedDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

const BorrowedBooks = mongoose.model("BorrowedBooks", BorrowedBookSchema);

module.exports = { BorrowedBooks };
