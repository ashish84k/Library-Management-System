import React, { useEffect, useState } from "react";
import BookCard from "../common/BookCard";
import url from "../../service/url";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Backend se books fetch karna
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${url}/api/books`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);

        if (res.ok && data) setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  async function BorrowedBooks(id) {
    try {
      const res = await fetch(`${url}/api/borrow/${id}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Book borrowed successfully!");
        // Agar books list refresh karni hai to koi function call kar sakte ho
      } else {
        alert(data.message || "Failed to borrow book");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Available Books
      </h2>

      {books.length === 0 ? (
        <p>No books available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} onBorrow={BorrowedBooks} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
