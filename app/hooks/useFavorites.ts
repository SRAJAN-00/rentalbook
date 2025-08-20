"use client";

import { useState, useEffect } from "react";

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

interface FavoriteItem {
  bookId: Book | string;
}

interface UseFavoritesOptions {
  onRemove?: (bookId: string) => void; // Optional callback for removing from display
}

interface UseFavoritesReturn {
  favoriteIds: string[];
  favoriteBooks: Book[];
  setFavoriteIds: React.Dispatch<React.SetStateAction<string[]>>;
  isLoadingFavorites: boolean;
  handleToggleFavorite: (bookId: string, isFav: boolean) => Promise<void>;
}

export const useFavorites = (
  options?: UseFavoritesOptions
): UseFavoritesReturn => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  // Fetch all favorites once on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoadingFavorites(true);
        const res = await fetch("/api/fav");
        const data = await res.json();
        console.log("Favorites API response:", data); // Debug log
        console.log("API Response status:", res.status); // Debug log

        if (!res.ok) {
          console.error("API error:", data.error);
          setFavoriteIds([]); // Set empty array on error
          return;
        }

        if (Array.isArray(data.data)) {
          console.log("Raw favorites data:", data.data); // Debug log

          // If we got more than a reasonable number of favorites, something is wrong
          if (data.data.length > 50) {
            console.warn(
              "Too many favorites returned, likely not filtered by user. Setting empty array."
            );
            setFavoriteIds([]);
            setFavoriteBooks([]);
            return;
          }

          // Extract both IDs and full book objects from the response
          const ids: string[] = [];
          const books: Book[] = [];

          data.data.forEach((fav: FavoriteItem) => {
            console.log("Processing fav:", fav); // Debug log

            if (typeof fav.bookId === "object" && fav.bookId !== null) {
              // Full book object available
              const book = fav.bookId as Book;
              ids.push(book._id);
              books.push(book);
              console.log("Added full book:", book.title, "ID:", book._id); // Debug log
            } else if (typeof fav.bookId === "string") {
              // Only ID available
              ids.push(fav.bookId);
              console.log("Added ID only:", fav.bookId); // Debug log
            }
          });

          console.log("Final favoriteIds:", ids); // Debug log
          console.log("Final favoriteBooks:", books.length, "books"); // Debug log

          setFavoriteIds(ids);
          setFavoriteBooks(books);
        } else {
          console.log("No favorites data or not an array");
          setFavoriteIds([]);
          setFavoriteBooks([]);
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setFavoriteIds([]); // Set empty array on error
        setFavoriteBooks([]); // Set empty array on error
      } finally {
        setIsLoadingFavorites(false);
      }
    };
    fetchFavorites();
  }, []);

  // Toggle favorite handler with optimistic updates
  const handleToggleFavorite = async (bookId: string, isFav: boolean) => {
    // Optimistic update - change UI immediately
    setFavoriteIds((prev) =>
      isFav ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );

    // Optimistic update for favorite books (remove only, can't add without book data)
    if (isFav) {
      setFavoriteBooks((prev) => prev.filter((book) => book._id !== bookId));
    }

    // Call optional remove callback for favorites page (optimistically)
    if (isFav && options?.onRemove) {
      options.onRemove(bookId);
    }

    try {
      const url = "/api/fav";
      const requestOptions = {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      };
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        // API failed - revert the optimistic update
        console.error("Failed to toggle favorite, reverting...");
        setFavoriteIds((prev) =>
          isFav ? [...prev, bookId] : prev.filter((id) => id !== bookId)
        );

        // Revert favorite books if we removed it optimistically
        if (isFav) {
          // We'd need to refetch to get the book data back, but for now just log
          console.warn("Cannot restore removed book without refetching");
        }
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      // Revert optimistic update on error
      setFavoriteIds((prev) =>
        isFav ? [...prev, bookId] : prev.filter((id) => id !== bookId)
      );

      if (isFav) {
        console.warn("Cannot restore removed book without refetching");
      }
    }
  };

  return {
    favoriteIds, // For BookCard components (heart icon state)
    favoriteBooks, // For FavoritesPage (full book objects)
    setFavoriteIds, // Direct state setter for advanced use
    isLoadingFavorites, // Loading state for UI
    handleToggleFavorite, // Main toggle function
  };
};
