"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRental } from "../../../hooks/useRental";
import { useBookDetails } from "../../../hooks/useBookDetails";
import Button from "../../../components/ModernButton";
import DashboardLayout from "@/app/components/DashboardLayout";
import Image from "next/image";

export default function RentBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [bookId, setBookId] = useState<string>("");
  const router = useRouter();

  // Extract book ID from params
  useEffect(() => {
    const getBookId = async () => {
      const { id } = await params;
      setBookId(id);
    };
    getBookId();
  }, [params]);

  // Use the book details hook
  const {
    book,
    isRented,
    isAvailable,
    loading,
    error,
    isAuthenticated,
  } = useBookDetails(bookId);

  // Use rental hook
  const {
    renterName,
    setRenterName,
    renterEmail,
    setRenterEmail,
    isRenting,
  } = useRental({
    onRentalSuccess: () => {
      // Redirect back to book details
      router.push(`/books/${bookId}`);
    },
  });

  // Custom submit handler that includes the bookId
  const handleSubmitWithBookId = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId || !renterName || !renterEmail) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          renterName,
          renterEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Book rented successfully!");
        // Redirect back to book details
        router.push(`/books/${bookId}`);
      } else {
        alert(result.error || "Failed to rent book");
      }
    } catch {
      alert("Error renting book");
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Rent Book">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading book details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !book) {
    return (
      <DashboardLayout title="Rent Book">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book Not Found
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button href="/books" variant="primary">
              Back to Library
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAvailable || isRented) {
    return (
      <DashboardLayout title="Rent Book">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book Unavailable
            </h2>
            <p className="text-gray-600 mb-6">
              This book is currently not available for rental.
            </p>
            <div className="flex gap-4 justify-center">
              <Button href={`/books/${bookId}`} variant="outline">
                Back to Book Details
              </Button>
              <Button href="/books" variant="primary">
                Browse Other Books
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Rent Book">
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Rent This Book
            </h1>
            <p className="text-gray-600">
              Fill out the form below to complete your rental
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Book Information */}
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Book Details
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      {book.imageUrl ? (
                        <Image
                          src={book.imageUrl}
                          alt={book.title}
                          width={120}
                          height={160}
                          className="rounded-lg shadow-sm object-cover"
                        />
                      ) : (
                        <div className="w-[120px] h-[160px] bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-3xl text-gray-400">📚</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-3">by {book.author}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {book.genre}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {book.publishedYear}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Rental Terms */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-3">
                      Rental Terms
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• 14-day rental period</li>
                      <li>• Late fees may apply</li>
                      <li>• Renewable if available</li>
                      <li>• Email confirmation included</li>
                    </ul>
                  </div>

                  {/* Availability */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">
                      ✅ Available Now
                    </h4>
                    <p className="text-sm text-green-800">
                      {book.availableCopies} copies available for rental
                    </p>
                  </div>
                </div>

                {/* Rental Form */}
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Your Information
                  </h2>
                  
                  <form onSubmit={handleSubmitWithBookId} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={renterName}
                        onChange={(e) => setRenterName(e.target.value)}
                        required
                        disabled={isRenting}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={renterEmail}
                        onChange={(e) => setRenterEmail(e.target.value)}
                        required
                        disabled={isRenting}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter your email address"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Confirmation will be sent to this email
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="button"
                          onClick={() => router.push(`/books/${bookId}`)}
                          variant="outline"
                          className="w-full sm:w-auto order-2 sm:order-1"
                          disabled={isRenting}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-full sm:flex-1 order-1 sm:order-2"
                          disabled={isRenting}
                        >
                          {isRenting ? "Processing..." : "Rent Book"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
