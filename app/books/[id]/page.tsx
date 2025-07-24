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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/books"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Books
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Book Details
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Image */}
            <div className="md:flex-shrink-0 md:w-1/3">
              <div className="h-96 md:h-full relative">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">📖</div>
                      <span className="text-gray-600 text-lg">
                        No Cover Available
                      </span>
                    </div>
                  </div>
                )}

                {/* Availability Badge */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold shadow-lg ${
                    isAvailable
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isAvailable
                    ? `${book.availableCopies} Available`
                    : "Not Available"}
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {book.title}
                </h1>
                <p className="text-2xl text-blue-600 font-semibold mb-4">
                  by {book.author}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {book.genre}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                    Published {book.publishedYear}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Available Copies
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {book.availableCopies}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Total Copies
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {book.totalCopies}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isAvailable && !isRented ? (
                  <>
                    <RentModal bookId={book._id} />
                    <Link href="/books">
                      <Button variant="outline" className="px-8">
                        Back to Library
                      </Button>
                    </Link>
                  </>
                ) : isRented ? (
                  <>
                    <Button
                      onClick={handleReturnBook}
                      variant="secondary"
                      className="px-8"
                      disabled={checkingRental}
                    >
                      {checkingRental ? "Returning..." : "Return Book"}
                    </Button>
                    <Link href="/dashboard">
                      <Button variant="outline" className="px-8">
                        View My Rentals
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button disabled variant="outline" className="px-8">
                      Currently Unavailable
                    </Button>
                    <Link href="/books">
                      <Button variant="primary" className="px-8">
                        Browse Other Books
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Book Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Availability Status
              </h4>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-gray-600">
                  {isAvailable ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Publication Year
              </h4>
              <span className="text-gray-600">{book.publishedYear}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
