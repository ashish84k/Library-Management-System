const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      unique: true,
      required: true,
    },
    availableCopies: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", BookSchema);

module.exports = { Books };
