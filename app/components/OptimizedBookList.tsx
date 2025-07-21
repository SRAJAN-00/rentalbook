"use client";

import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Button from "./ModernButton";
import BookFilterSort from "./BookFilterSort";

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

interface OptimizedBookListProps {
  initialBooks: Book[]; // ← Pre-loaded from server
}

export default function OptimizedBookList({
  initialBooks,
}: OptimizedBookListProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks); // ← Start with server data
  const [loading, setLoading] = useState(false); // ← No initial loading!
  const [error, setError] = useState("");
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");

  // Only refresh data when needed (not on initial load)
  const refreshBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/books");
      const result = await response.json();
      if (result.success) {
        setBooks(result.data);
      }
    } catch (error) {
      setError("Error refreshing books");
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
        headers: { "Content-Type": "application/json" },
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
        refreshBooks(); // ← Only refresh after rental
      } else {
        alert(result.error || "Failed to rent book");
      }
    } catch (error) {
      alert("Error renting book");
    }
  };

  // Get unique genres for filter dropdown
  const availableGenres = [...new Set(books.map((book) => book.genre))]
    .filter(Boolean)
    .sort();

  // Filter and sort books
  const filteredAndSortedBooks = books
    .filter((book) => {
      const matchesGenre = !genreFilter || book.genre === genreFilter;
      const matchesAvailability =
        !availabilityFilter ||
        (availabilityFilter === "available" && book.availableCopies > 0) ||
        (availabilityFilter === "unavailable" && book.availableCopies === 0);

      return matchesGenre && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "year":
          return b.publishedYear - a.publishedYear;
        case "availability":
          return b.availableCopies - a.availableCopies;
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setGenreFilter("");
    setAvailabilityFilter("");
    setSortBy("title");
  };

  return (
    <div>
      {/* Filter and Sort Controls */}
      <BookFilterSort
        genres={availableGenres}
        genreFilter={genreFilter}
        availabilityFilter={availabilityFilter}
        sortBy={sortBy}
        onGenreChange={setGenreFilter}
        onAvailabilityChange={setAvailabilityFilter}
        onSortChange={setSortBy}
        onClearFilters={clearFilters}
        hasActiveFilters={
          genreFilter !== "" || availabilityFilter !== "" || sortBy !== "title"
        }
      />

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedBooks.length} of {books.length} books
        </p>
        {loading && (
          <div className="flex items-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Refreshing...
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <Button
            onClick={refreshBooks}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Books Grid */}
      {books.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">�</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No Books Available
          </h3>
          <p className="text-gray-600 mb-6">No books available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <BookCard key={book._id} book={book} onRent={handleRent} />
          ))}
        </div>
      )}

      {/* Rental Modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Rent This Book
            </h3>

            <form onSubmit={submitRental} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                  Rent Book
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowRentModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
