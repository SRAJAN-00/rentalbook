"use client";

import { useState, useEffect } from "react";
import BookCard from "./BookCard";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  imageUrl?: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      const result = await response.json();

      if (result.success) {
        setBooks(result.data);
      } else {
        setError("Failed to fetch books");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  const handleRent = (bookId: string) => {
    setSelectedBookId(bookId);
    setShowRentModal(true);
  };

  const submitRental = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: selectedBookId,
          renterName,
          renterEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Book rented successfully!");
        setShowRentModal(false);
        setRenterName("");
        setRenterEmail("");
        fetchBooks(); // Refresh book list
      } else {
        alert(result.error || "Failed to rent book");
      } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error renting book");
    }
  };

  const seedData = async () => {
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });
      const result = await response.json();

      if (result.success) {
        alert("Dummy data added successfully!");
        fetchBooks();
      } else {
        alert(result.message || "Failed to seed data");
      } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error seeding data");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading amazing books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">😞</div>
        <p className="text-red-600 text-lg">Oops! {error}</p>
        <button
          onClick={fetchBooks}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Available Books</h2>
          <p className="text-gray-600 mt-1">
            {books.length} books in our collection
          </p>
        </div>
        {books.length === 0 && (
          <button
            onClick={seedData}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            ✨ Add Sample Books
          </button>
        )}
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">📚</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No Books Yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by adding some sample books to see how the library
            works!
          </p>
          <button
            onClick={seedData}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            🚀 Add Sample Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onRent={handleRent} />
          ))}
        </div>
      )}

      {/* Rental Modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">📖</div>
              <h3 className="text-2xl font-bold text-gray-900">
                Rent This Book
              </h3>
              <p className="text-gray-600 mt-2">
                Enter your details to rent this book
              </p>
            </div>

            <form onSubmit={submitRental} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  📚 Rent Book
                </button>
                <button
                  type="button"
                  onClick={() => setShowRentModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
