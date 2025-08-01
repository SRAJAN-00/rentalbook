"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OptimizedBookList from "../components/OptimizedBookList";
import DashboardLayout from "../components/DashboardLayout";

// Client-side component for better authentication handling
export default function BooksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [initialBooks, setInitialBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch books on client side
  useEffect(() => {
    async function fetchBooksData() {
      if (session) {
        try {
          // Use Promise.all to fetch books and favorites simultaneously for better performance
          const [booksResponse, favoritesResponse] = await Promise.all([
            fetch("/api/books"),
            fetch("/api/fav"),
          ]);

          if (booksResponse.ok) {
            const booksResult = await booksResponse.json();
            if (booksResult.success) {
              setInitialBooks(booksResult.data);
            }
          }

          // The favorites data will be handled by the useFavorites hook,
          // but this parallel fetch helps warm up the cache
        } catch (error) {
          console.error("Error fetching books data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    if (status === "authenticated") {
      fetchBooksData();
    }
  }, [session, status]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          {/* Animated Library Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-6xl animate-bounce">📚</span>
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-150"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-300"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Loading Library
            </h2>
            <p className="text-gray-600 text-lg">
              Preparing your book collection...
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">
          Discover and rent books from our collection
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            {/* Mini Loading Animation */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-3xl animate-bounce">📖</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Loading Books
            </h3>
            <p className="text-gray-600">Fetching the latest collection...</p>

            {/* Mini Progress Dots */}
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      ) : (
        <OptimizedBookList initialBooks={initialBooks} />
      )}
    </DashboardLayout>
  );
}
