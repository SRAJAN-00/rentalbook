"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Custom hook for managing book details, rental status, and related operations
 *
 * @example
 * // Basic usage
 * const { book, isRented, loading } = useBookDetails(bookId);
 *
 * @example
 * // With callbacks
 * const { book, isRented, updateRentalStatus } = useBookDetails(bookId, {
 *   onBookLoad: (book) => console.log('Book loaded:', book.title),
 *   onRentalStatusChange: (isRented) => console.log('Rental status:', isRented)
 * });
 *
 * @example
 * // Refresh after operations
 * const { refreshBookDetails, updateRentalStatus } = useBookDetails(bookId);
 *
 * // After successful rental
 * await updateRentalStatus(true);
 *
 * // Manual refresh
 * await refreshBookDetails();
 */

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
  rentalPrice: number;
  purchasePrice?: number;
}

interface UseBookDetailsOptions {
  onBookLoad?: (book: Book) => void; // Optional callback when book is loaded
  onRentalStatusChange?: (isRented: boolean) => void; // Optional callback when rental status changes
}

// Function to fetch a single book by ID
async function getBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch("/api/books", {
      cache: "no-store",
    });
    const result = await response.json();

    if (result.success) {
      const book = result.data.find((book: Book) => book._id === id);
      return book || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

// Function to check rental status
async function checkRentalStatus(bookId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/rentals/check?bookId=${bookId}`);
    const result = await response.json();

    if (response.ok) {
      return result.isRented || false;
    }
    return false;
  } catch (error) {
    console.error("Error checking rental status:", error);
    return false;
  }
}

export const useBookDetails = (
  bookId: string,
  options?: UseBookDetailsOptions
) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State management
  const [book, setBook] = useState<Book | null>(null);
  const [isRented, setIsRented] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  // Validate bookId
  useEffect(() => {
    if (!bookId) {
      setError("Book ID is required");
      setLoading(false);
    }
  }, [bookId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Main data fetching function using Promise.all for optimization
  const fetchBookDetails = useCallback(async () => {
    if (!session || !bookId) return;

    try {
      setLoading(true);
      setError(null);

      // Use Promise.all to fetch book data and rental status simultaneously
      const [bookData, rentalStatus] = await Promise.all([
        getBook(bookId),
        checkRentalStatus(bookId),
      ]);

      if (bookData) {
        setBook(bookData);
        setIsRented(rentalStatus);

        // Call optional callback when book is loaded
        if (options?.onBookLoad) {
          options.onBookLoad(bookData);
        }

        // Call optional callback when rental status is set
        if (options?.onRentalStatusChange) {
          options.onRentalStatusChange(rentalStatus);
        }
      } else {
        setError("Book not found");
      }
    } catch (err) {
      console.error("Error fetching book details:", err);
      setError("Failed to load book details");
    } finally {
      setLoading(false);
    }
  }, [session, bookId, options]);

  // Refresh book details (useful after rental/return operations)
  const refreshBookDetails = useCallback(async () => {
    if (!session || !bookId) return;

    try {
      setIsRefreshing(true);
      setError(null);

      // Use Promise.all for optimized refresh
      const [bookData, rentalStatus] = await Promise.all([
        getBook(bookId),
        checkRentalStatus(bookId),
      ]);

      if (bookData) {
        setBook(bookData);
        setIsRented(rentalStatus);

        // Call optional callback when rental status changes
        if (options?.onRentalStatusChange) {
          options.onRentalStatusChange(rentalStatus);
        }
      }
    } catch (err) {
      console.error("Error refreshing book details:", err);
      setError("Failed to refresh book details");
    } finally {
      setIsRefreshing(false);
    }
  }, [session, bookId, options]);

  // Update rental status (called after successful rental/return)
  const updateRentalStatus = useCallback(
    async (newStatus: boolean) => {
      setIsRented(newStatus);

      // Refresh book data to get updated available copies
      if (book) {
        try {
          const updatedBook = await getBook(bookId);
          if (updatedBook) {
            setBook(updatedBook);
          }
        } catch (error) {
          console.error("Error updating book data:", error);
        }
      }

      // Call optional callback
      if (options?.onRentalStatusChange) {
        options.onRentalStatusChange(newStatus);
      }
    },
    [book, bookId, options]
  );

  // Fetch book details when component mounts or dependencies change
  useEffect(() => {
    if (isAuthenticated && bookId) {
      fetchBookDetails();
    }
  }, [isAuthenticated, bookId, fetchBookDetails]);

  // Computed values
  const isAvailable = book ? book.availableCopies > 0 : false;
  const isBookLoaded = book !== null;
  const shouldShowLoading = loading || isLoading;

  return {
    // Book data
    book,
    isRented,
    isAvailable,
    isBookLoaded,

    // Loading states
    loading: shouldShowLoading,
    isRefreshing,
    error,

    // Authentication states
    isAuthenticated,
    isLoading: isLoading,
    session,

    // Actions
    refreshBookDetails,
    updateRentalStatus,
    fetchBookDetails,

    // Utility functions
    retry: fetchBookDetails,
  };
};
