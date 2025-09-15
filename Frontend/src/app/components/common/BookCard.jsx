import React from "react";

function BookCard({ book, onBorrow }) {
  const handleBorrow = () => {
    if (onBorrow) {
      onBorrow(book._id);
    }
  };

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Title */}
      <h3 className="text-xl font-bold text-indigo-700 mb-2 line-clamp-1">
        {book.title}
      </h3>

      {/* Author & Genre */}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Author:</span> {book.author}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-medium">Genre:</span> {book.genre}
      </p>

      {/* Availability */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            book.availableCopies > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {book.availableCopies > 0
            ? `${book.availableCopies} Available`
            : "Out of Stock"}
        </span>
        <span className="text-xs text-gray-400">
          ISBN: {book.ISBN || "N/A"}
        </span>
      </div>

      {/* Borrow Button */}
      <button
        onClick={handleBorrow}
        disabled={book.availableCopies === 0}
        className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors duration-300 ${
          book.availableCopies === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {book.availableCopies === 0 ? "Not Available" : "Borrow Book"}
      </button>
    </div>
  );
}

export default BookCard;
