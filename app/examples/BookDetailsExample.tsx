// Example usage of useBookDetails hook

"use client";

import { useBookDetails } from "../hooks/useBookDetails";
import { useRental } from "../hooks/useRental";

/**
 * Example component showing how to use useBookDetails hook
 * This could be used for book previews, quick view modals, etc.
 */
export function BookPreview({ bookId }: { bookId: string }) {
  // Use the book details hook with callbacks
  const {
    book,
    isRented,
    isAvailable,
    loading,
    error,
    updateRentalStatus,
    refreshBookDetails,
  } = useBookDetails(bookId, {
    onBookLoad: (book) => {
      console.log(`📚 Loaded book: ${book.title}`);
    },
    onRentalStatusChange: (isRented) => {
      console.log(
        `📖 Rental status changed: ${isRented ? "Rented" : "Available"}`
      );
    },
  });

  // Use rental hook for operations
  const { handleReturnBook, isReturning } = useRental({
    onReturnSuccess: async () => {
      // Update rental status using the book details hook
      await updateRentalStatus(false);
    },
  });

  if (loading) {
    return <div>Loading book details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-preview">
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <p>
        Status:{" "}
        {isRented
          ? "Rented by you"
          : isAvailable
          ? "Available"
          : "Not available"}
      </p>

      {isRented && (
        <button
          onClick={() => handleReturnBook(book._id)}
          disabled={isReturning}
        >
          {isReturning ? "Returning..." : "Return Book"}
        </button>
      )}

      <button onClick={refreshBookDetails}>Refresh Details</button>
    </div>
  );
}

/**
 * Example of using the hook for batch operations
 */
export function BookList({ bookIds }: { bookIds: string[] }) {
  return (
    <div>
      {bookIds.map((bookId) => (
        <BookPreview key={bookId} bookId={bookId} />
      ))}
    </div>
  );
}
