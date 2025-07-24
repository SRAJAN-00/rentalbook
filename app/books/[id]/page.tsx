"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "../../components/ModernButton";
import RentModal from "@/app/components/RentModal";

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

async function getBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/books`,
      {
        cache: "no-store",
      }
    );
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

export default function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRented, setIsRented] = useState(false);
  const [checkingRental, setCheckingRental] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch book data and check rental status
  useEffect(() => {
    async function fetchBookAndCheckRental() {
      if (session) {
        try {
          const { id } = await params;
          const bookData = await getBook(id);
          setBook(bookData);

          // Check if user has already rented this book
          if (bookData) {
            setCheckingRental(true);
            const response = await fetch(`/api/rentals/check?bookId=${id}`);
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                setIsRented(result.isRented);
              }
            }
            setCheckingRental(false);
          }
        } catch (error) {
          console.error("Error fetching book:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    if (status === "authenticated") {
      fetchBookAndCheckRental();
    }
  }, [session, status, params]);

  const handleReturnBook = async () => {
    if (!book) return;

    // Add loading state
    setCheckingRental(true);

    try {
      const response = await fetch(`/api/rentals/return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: book._id }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success! Update the UI
        setIsRented(false);
        alert("Book returned successfully!");

        // Optionally refresh book data to update available copies
        const { id } = await params;
        const updatedBook = await getBook(id);
        if (updatedBook) {
          setBook(updatedBook);
        }
      } else {
        alert(result.error || "Failed to return book");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error returning book. Please try again.");
    } finally {
      setCheckingRental(false);
    }
  };

  // Show loading while checking authentication
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          {/* Animated Book Icon */}
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
            <h2 className="text-2xl font-bold text-gray-800">Loading Book Details</h2>
            <p className="text-gray-600 text-lg">Please wait while we fetch the information...</p>
            
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

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  if (!book) {
    notFound();
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Compact Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/books"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Back to Library
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Book Details</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Compact Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section - More Compact */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20">
          <div className="lg:flex">
            {/* Book Image Section - Smaller */}
            <div className="lg:w-1/3 relative">
              <div className="h-80 lg:h-96 relative overflow-hidden">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-3">📖</div>
                      <span className="text-sm font-medium opacity-90">
                        No Cover Available
                      </span>
                    </div>
                  </div>
                )}

                {/* Compact Floating Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs shadow-lg backdrop-blur-sm border ${
                      isAvailable
                        ? "bg-green-500/90 text-white border-green-400/30"
                        : "bg-red-500/90 text-white border-red-400/30"
                    }`}
                  >
                    {isAvailable ? `${book.availableCopies} Available` : "Not Available"}
                  </div>
                </div>

                {/* Rental Status Badge */}
                {isRented && (
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-lg font-semibold text-xs bg-blue-500/90 text-white shadow-lg backdrop-blur-sm border border-blue-400/30">
                      Currently Rented
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Information Section - More Compact */}
            <div className="lg:w-2/3 p-6">
              {/* Title and Author - Smaller */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {book.title}
                </h1>
                <p className="text-lg lg:text-xl text-blue-600 font-semibold mb-4">
                  by {book.author}
                </p>

                {/* Compact Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-medium text-xs">
                    📚 {book.genre}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-medium text-xs">
                    📅 {book.publishedYear}
                  </span>
                </div>
              </div>

              {/* Compact Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-green-700 mb-0.5">
                        Available Now
                      </h3>
                      <p className="text-xl font-bold text-green-800">
                        {book.availableCopies}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📖</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-blue-700 mb-0.5">
                        Total Copies
                      </h3>
                      <p className="text-xl font-bold text-blue-800">
                        {book.totalCopies}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">📝</span>
                  Description
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isAvailable && !isRented ? (
                  <>
                    <RentModal bookId={book._id} />
                    <Button 
                      href="/books" 
                      variant="outline" 
                      size="md"
                      className="px-6 py-2 text-sm font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-200"
                    >
                      Browse More Books
                    </Button>
                  </>
                ) : isRented ? (
                  <>
                    <Button
                      onClick={handleReturnBook}
                      variant="secondary"
                      size="md"
                      disabled={checkingRental}
                      className="px-6 py-2 text-sm font-semibold rounded-xl hover:scale-105 transition-all duration-200 disabled:hover:scale-100"
                    >
                      {checkingRental ? (
                        <span className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Returning...
                        </span>
                      ) : (
                        "Return Book"
                      )}
                    </Button>
                    <Button 
                      href="/dashboard/rentals" 
                      variant="outline" 
                      size="md"
                      className="px-6 py-2 text-sm font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-200"
                    >
                      My Rentals
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      disabled 
                      variant="outline" 
                      size="md"
                      className="px-6 py-2 text-sm font-semibold rounded-xl border-2 opacity-50 cursor-not-allowed"
                    >
                      Currently Unavailable
                    </Button>
                    <Button 
                      href="/books" 
                      variant="primary" 
                      size="md"
                      className="px-6 py-2 text-sm font-semibold rounded-xl hover:scale-105 transition-all duration-200"
                    >
                      Browse Other Books
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Additional Information */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Book Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Book Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700 text-sm">Genre</span>
                  <span className="text-gray-900 font-medium text-sm">{book.genre}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700 text-sm">Published</span>
                  <span className="text-gray-900 font-medium text-sm">{book.publishedYear}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700 text-sm">Status</span>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-gray-900 font-medium text-sm">
                      {isAvailable ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">ℹ️</span>
                Rental Info
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <p className="text-gray-700 text-sm">Standard rental period is 14 days</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <p className="text-gray-700 text-sm">Late returns may incur fees</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <p className="text-gray-700 text-sm">Books can be renewed if available</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                  <p className="text-gray-700 text-sm">Digital receipts sent via email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
