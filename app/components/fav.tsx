"use client";
import { useEffect, useRef, useState } from "react";

const Fav = ({ bookId }: { bookId?: string }) => {
  const [fav, setIsFav] = useState(false);
  const hasFetched = useRef(false); // Prevents multiple fetches

  useEffect(() => {
    if (!bookId || hasFetched.current) return;

    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/fav");
        const data = await res.json();

        if (res.ok && Array.isArray(data.data)) {
          const found = data.data.some(
            (fav: any) => fav.bookId?._id === bookId || fav.bookId === bookId
          );
          setIsFav(found);
        }
      } catch (err) {
        console.error("Error checking favorites", err);
      } finally {
        hasFetched.current = true; // Mark that fetch has happened
      }
    };

    checkFavorite();
  }, [bookId]);

  const handleFavClick = async () => {
    if (!bookId) return;

    try {
      const url = "/api/fav";
      const options = {
        method: fav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      };

      const res = await fetch(url, options);
      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error || res.status}`);
        return;
      }

      setIsFav(!fav);
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  return (
    <button
      onClick={handleFavClick}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      {fav ? "❤️" : "🤍"}
    </button>
  );
};

export default Fav;
