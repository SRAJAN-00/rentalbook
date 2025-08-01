"use client";
import BookCard from "@/app/components/BookCard";
import Button from "@/app/components/ModernButton";
import DashboardLayout from "@/app/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFavorites } from "@/app/hooks/useFavorites";

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
  const [loading, setLoading] = useState(true);

  // Use the custom favorites hook with callback to remove books from display
  const { favoriteIds, handleToggleFavorite } = useFavorites({
    onRemove: (bookId: string) => {
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    },
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/fav");
        const result = await response.json();
        if (response.ok && Array.isArray(result.data)) {
          // result.data is an array of Fav objects with populated bookId
          const favoriteBooks = result.data.map((fav: any) => fav.bookId);
          setBooks(favoriteBooks);
        } else {
          console.error("Failed to fetch favorites:", result.error);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <DashboardLayout title="Your Favorite Books">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg animate-pulse">
                <span className="text-2xl">💖</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Your Favorite Books
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover and manage your collection of beloved books. Each story
              that captured your heart lives here.
            </p>
          </div>

          {/* Stats Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">
                  {loading ? "..." : books.length}
                </div>
                <div className="text-gray-600 font-medium">Favorite Books</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {loading
                    ? "..."
                    : books.filter((book) => book.availableCopies > 0).length}
                </div>
                <div className="text-gray-600 font-medium">Available Now</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {loading
                    ? "..."
                    : [...new Set(books.map((book) => book.genre))].length}
                </div>
                <div className="text-gray-600 font-medium">Genres</div>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
                    <div className="flex gap-2 mb-3">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">💔</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start exploring our collection and add books to your favorites
                by clicking the heart icon!
              </p>
              <Button
                href="/books"
                variant="primary"
                className="px-8 py-3 text-lg font-semibold"
              >
                Browse Books
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book, idx) => (
                <Link
                  key={book._id || idx}
                  href={`/books/${book._id}`}
                  className="block transform hover:scale-105 transition-transform duration-200"
                >
                  <BookCard
                    book={book}
                    isFavorite={favoriteIds.includes(book._id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
