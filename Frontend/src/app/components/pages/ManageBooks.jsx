import React, { useEffect, useState } from "react";
import url from "../../service/url";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    ISBN: "",
    availableCopies: 1,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch books from backend
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/api/books`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      alert("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = editId ? `${url}/api/books/${editId}` : `${url}/api/books/add`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        alert(editId ? "Book updated successfully!" : "Book added successfully!");
        setForm({
          title: "",
          author: "",
          genre: "",
          publishedYear: "",
          ISBN: "",
          availableCopies: 1,
        });
        setEditId(null);
        setShowForm(false);
        fetchBooks();
      } else {
        alert(data.message || "Failed to save book.");
      }
    } catch (err) {
      console.error("Error saving book:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`${url}/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        alert("Book deleted successfully!");
        fetchBooks();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete book.");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    setEditId(null);
    setForm({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      ISBN: "",
      availableCopies: 1,
    });
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <div className="px-8 py-10 bg-gray-50 min-h-screen">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-600">Manage Books</h2>
        <button
          onClick={handleAddClick}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {showForm ? "Close Form" : "Add Book"}
        </button>
      </div>

      {/* Add/Edit Form Card */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto transition-all duration-300">
          <h3 className="text-2xl font-bold text-indigo-600 mb-6">
            {editId ? "Edit Book" : "Add New Book"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["title","author","genre","publishedYear","ISBN","availableCopies"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">
                  {field === "publishedYear" ? "Published Year" : field === "availableCopies" ? "Available Copies" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  type={field === "publishedYear" || field === "availableCopies" ? "number" : "text"}
                  min={field === "availableCopies" ? 1 : undefined}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field === "publishedYear" ? "YYYY" : field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="sm:col-span-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {editId ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>
      )}

      {/* Books List */}
      {loading ? (
        <p className="text-center mt-6">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="p-5 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-1"><span className="font-medium">Author:</span> {book.author}</p>
              <p className="text-gray-600 mb-3"><span className="font-medium">Genre:</span> {book.genre}</p>
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
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageBooks;
