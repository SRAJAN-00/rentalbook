"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import BookCard from "./BookCard";
import Button from "./ModernButton";
import BookFilterSort from "./BookFilterSort";
import { useFavorites } from "../hooks/useFavorites";
import { useRental } from "../hooks/useRental";

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
  // Use the custom favorites hook
  const { favoriteIds, isLoadingFavorites, handleToggleFavorite } =
    useFavorites();

  // Use the custom rental hook
  const {
    renterName,
    setRenterName,
    renterEmail,
    setRenterEmail,
    showRentModal,
    isRenting,
    handleRentSubmit,
    closeRentModal,
  } = useRental({
    onRentalSuccess: () => {
      refreshBooks(); // Refresh books after successful rental
    },
  });

  const [books, setBooks] = useState<Book[]>(initialBooks); // ← Start with server data
  const [loading, setLoading] = useState(false); // ← No initial loading!
  const [error, setError] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Only refresh data when needed (not on initial load)
  const refreshBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/books");
      const result = await response.json();
      if (result.success) {
        setBooks(result.data);
      }
    } catch {
      setError("Error refreshing books");
    } finally {
      setLoading(false);
    }
  };

  // Get unique genres for filter dropdown (memoized)
  const availableGenres = useMemo(
    () => [...new Set(books.map((book) => book.genre))].filter(Boolean).sort(),
    [books]
  );

  // Filter and sort books (memoized for performance)
  const filteredAndSortedBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search filter
        const matchesSearch =
          !debouncedSearchTerm ||
          book.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          book.author
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

        const matchesGenre = !genreFilter || book.genre === genreFilter;
        const matchesAvailability =
          !availabilityFilter ||
          (availabilityFilter === "available" && book.availableCopies > 0) ||
          (availabilityFilter === "unavailable" && book.availableCopies === 0);

        return matchesSearch && matchesGenre && matchesAvailability;
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
  }, [books, genreFilter, availabilityFilter, sortBy, debouncedSearchTerm]);

  const clearFilters = useCallback(() => {
    setGenreFilter("");
    setAvailabilityFilter("");
    setSortBy("title");
    setSearchTerm("");
  }, []);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search books by title, author, or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

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
          genreFilter !== "" ||
          availabilityFilter !== "" ||
          sortBy !== "title" ||
          searchTerm !== ""
        }
      />

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <p>
            Showing {filteredAndSortedBooks.length} of {books.length} books
          </p>
          {debouncedSearchTerm && (
            <p className="text-blue-600 mt-1">
              Search results for: &quot;{debouncedSearchTerm}&quot;
            </p>
          )}
        </div>
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
          <div className="text-6xl mb-6">📚</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No Books Available
          </h3>
          <p className="text-gray-600 mb-6">No books available.</p>
        </div>
      ) : isLoadingFavorites ? (
        // Show loading skeleton while favorites are being fetched
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border h-70 flex flex-col"
            >
              {/* Image skeleton */}
              <div className="h-40 bg-gray-200 animate-pulse" />
              {/* Heart skeleton */}
              <div className="p-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
              </div>
              {/* Content skeleton */}
              <div className="p-3 flex-grow">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              isFavorite={favoriteIds.includes(book._id)}
              onToggleFavorite={handleToggleFavorite}
            />
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

            <form onSubmit={handleRentSubmit} className="space-y-4">
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
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={isRenting}
                >
                  {isRenting ? "Renting..." : "Rent Book"}
                </Button>
                <Button
                  type="button"
                  onClick={closeRentModal}
                  variant="outline"
                  className="flex-1"
                  disabled={isRenting}
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
