import React, { useEffect, useState } from "react";
import url from "../../service/url";

function MyBorrowed() {
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se borrowed books fetch karna
    const fetchBorrowed = async () => {
      try {
        const res = await fetch(`${url}/api/borrow/my`, {
          method: "GET",
          credentials: "include", // cookies ke liye
        });

        console.log(res);
        const data = await res.json();
        
        if (res.ok) {
          setBorrowed(data || []);
        }
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowed();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      const res = await fetch(
        `${url}/api/borrow/return/${bookId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        alert("Book returned successfully!");
        setBorrowed(borrowed.filter((b) => b._id !== bookId));
      }
    } catch (err) {
      console.error("Error returning book:", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading borrowed books...</p>;
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        My Borrowed Books
      </h2>

      {borrowed.length === 0 ? (
        <p className="text-gray-600">You have not borrowed any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowed.map((book) => (
            <div
              key={book._id}
              className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {book.book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Author: {book.book.author}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Borrowed On: {new Date(book.createdAt).toLocaleDateString()}
              </p>

              {book.status === "borrowed" ? (
                <button
                  onClick={() => handleReturn(book._id)}
                  className="mt-2 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Return Book
                </button>
              ) : (
                <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full">
                  Returned
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBorrowed;
