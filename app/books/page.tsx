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
    async function fetchBooks() {
      if (session) {
        try {
          const response = await fetch("/api/books");
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              setInitialBooks(result.data);
            }
          }
        } catch (error) {
          console.error("Error fetching books:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    if (status === "authenticated") {
      fetchBooks();
    }
  }, [session, status]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <OptimizedBookList initialBooks={initialBooks} />
      )}
    </DashboardLayout>
  );
}
