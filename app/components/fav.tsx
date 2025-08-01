"use client";
import { useEffect, useRef, useState } from "react";

interface FavProps {
  bookId?: string;
  isFavorite: boolean;
  onToggle: (bookId: string, isFav: boolean) => void;
}

const Fav = ({ bookId, isFavorite, onToggle }: FavProps) => {
  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!bookId) return;
    onToggle(bookId, isFavorite);
  };

  return (
    <button
      onClick={handleFavClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`
        group relative p-2 rounded-full transition-all duration-200 
        ${
          isFavorite
            ? "bg-white/90 shadow-lg hover:bg-white hover:shadow-xl"
            : "bg-white/70 hover:bg-white/90 shadow-md hover:shadow-lg"
        }
        backdrop-blur-sm border border-white/20
        transform hover:scale-110 active:scale-95
      `}
    >
      <div className="relative">
        {isFavorite ? (
          <div className="text-xl animate-pulse">❤️</div>
        ) : (
          <div className="text-xl group-hover:scale-110 transition-transform duration-200">
            🤍
          </div>
        )}

        {/* Subtle glow effect for favorited items */}
        {isFavorite && (
          <div className="absolute inset-0 rounded-full bg-red-200 opacity-30 animate-ping"></div>
        )}
      </div>
    </button>
  );
};

export default Fav;
