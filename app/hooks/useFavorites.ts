"use client";

import { useState, useEffect } from "react";

interface UseFavoritesOptions {
  onRemove?: (bookId: string) => void; // Optional callback for removing from display
}

export const useFavorites = (options?: UseFavoritesOptions) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
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
            return;
          }

          // data.data is an array of Fav objects with populated bookId
          const ids = data.data
            .map((fav: any) => {
              const bookId = fav.bookId?._id || fav.bookId;
              console.log("Extracting bookId:", bookId, "from fav:", fav); // Debug log
              return bookId;
            })
            .filter(Boolean); // Remove any null/undefined values
          console.log("Final favoriteIds:", ids); // Debug log
          setFavoriteIds(ids);
        } else {
          console.log("No favorites data or not an array");
          setFavoriteIds([]);
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setFavoriteIds([]); // Set empty array on error
      } finally {
        setIsLoadingFavorites(false);
      }
    };
    fetchFavorites();
  }, []);

  // Toggle favorite handler
  const handleToggleFavorite = async (bookId: string, isFav: boolean) => {
    try {
      const url = "/api/fav";
      const requestOptions = {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      };
      const res = await fetch(url, requestOptions);
      if (res.ok) {
        // Update favorite IDs state
        setFavoriteIds((prev) =>
          isFav ? prev.filter((id) => id !== bookId) : [...prev, bookId]
        );

        // Call optional remove callback for favorites page
        if (isFav && options?.onRemove) {
          options.onRemove(bookId);
        }
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return {
    favoriteIds,
    setFavoriteIds,
    isLoadingFavorites,
    handleToggleFavorite,
  };
};
