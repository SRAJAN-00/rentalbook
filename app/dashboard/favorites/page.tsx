"use client";
import BookCard from "@/app/components/BookCard";
import { useEffect, useState } from "react";

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

export default function FavoritesPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/fav");
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        // Extract book objects from favorites
        setBooks(data.data.map((fav: any) => fav.bookId));
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-purple-700 drop-shadow-lg">
        Your Favorite Books
      </h1>
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No favorites yet.
            </div>
          ) : (
            books.map((book, idx) => (
              <BookCard key={book._id || idx} book={book} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
