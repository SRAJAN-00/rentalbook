"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout";
import Button from "../../components/ModernButton";
import Image from "next/image";
import Link from "next/link";

interface RentalDisplay {
  id: string;
  bookId: {
    _id: string;
    imageUrl?: string;
  };
  title: string;
  author: string;
  genre: string;
  rentedDate: string;
  dueDate: string;
  status: string;
  daysLeft?: number;
  returnedDate?: string;
}

interface RentalApiData {
  _id: string;
  bookId?: {
    _id: string;
    title: string;
    author: string;
    genre: string;
    imageUrl?: string;
  };
  rentDate: string;
  dueDate: string;
  status: string;
  returnDate?: string;
}

export default function RentalsPage() {
  const [rentals, setRentals] = useState<RentalDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const fetchRentals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/rentals");
      const data = await response.json();

      if (data.success) {
        // Format rental data for the UI
        const formattedRentals = data.data.map((rental: RentalApiData) => ({
          id: rental._id,
          bookId: {
            _id: rental.bookId?._id || rental.bookId,
            imageUrl: rental.bookId?.imageUrl,
          },
          title: rental.bookId?.title || "Unknown Title",
          author: rental.bookId?.author || "Unknown Author",
          genre: rental.bookId?.genre || "Unknown Genre",
          rentedDate: new Date(rental.rentDate).toLocaleDateString(),
          dueDate: new Date(rental.dueDate).toLocaleDateString(),
          status: rental.status,
          returnedDate: rental.returnDate
            ? new Date(rental.returnDate).toLocaleDateString()
            : undefined,
          daysLeft:
            rental.status === "active"
              ? Math.ceil(
                  (new Date(rental.dueDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : undefined,
        }));

        setRentals(formattedRentals);
      }
    } catch (error) {
      console.error("Error fetching rentals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);
  const activeRentals = rentals.filter(
    (rental) => rental.status === "active" || rental.status === "overdue"
  );
  const returnedRentals = rentals.filter(
    (rental) => rental.status === "returned"
  );

  return (
    <DashboardLayout
      title="My Rentals"
      subtitle="Manage your current and past book rentals"
    >
      {!isLoading && (
        <div className="space-y-8">
          {/* Active Rentals */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">📖</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Active Rentals
                  </h2>
                </div>
                <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                  {activeRentals.length}{" "}
                  {activeRentals.length === 1 ? "book" : "books"}
                </span>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              {activeRentals.length > 0 ? (
                <div className="space-y-6">
                  {activeRentals.map((rental) => (
                    <div
                      key={rental.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-5">
                          <div className="w-20 h-28 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                            {rental.bookId?.imageUrl ? (
                              <Image
                                src={rental.bookId.imageUrl}
                                alt={rental.title}
                                width={80}
                                height={112}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-3xl">📚</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">
                              {rental.title}
                            </h3>
                            <p className="text-gray-700 mb-3 text-lg">
                              by {rental.author}
                            </p>
                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                              {rental.genre}
                            </span>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">Rented:</span>{" "}
                                  {rental.rentedDate}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">Due:</span>{" "}
                                  {rental.dueDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-4">
                          <span
                            className={`px-4 py-2 text-sm font-bold rounded-full shadow-sm ${
                              rental.status === "active"
                                ? rental.daysLeft !== undefined &&
                                  rental.daysLeft <= 3
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                  : "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {rental.status === "overdue" &&
                            rental.daysLeft !== undefined
                              ? `${Math.abs(rental.daysLeft)} days overdue`
                              : rental.daysLeft !== undefined &&
                                rental.daysLeft <= 3
                              ? `${rental.daysLeft} days left`
                              : "Active"}
                          </span>
                          <Link href={`/books/${rental.bookId._id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No active rentals
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Start exploring our amazing book collection!
                  </p>
                  <Button
                    onClick={() => router.push("/books")}
                    variant="primary"
                    size="lg"
                  >
                    Browse Books
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Rental History */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📜</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Rental History
                </h2>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              {returnedRentals.length > 0 ? (
                <div className="space-y-6">
                  {returnedRentals.map((rental) => (
                    <div
                      key={rental.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-5">
                          <div className="w-20 h-28 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg flex items-center justify-center shadow-md opacity-75 overflow-hidden">
                            {rental.bookId?.imageUrl ? (
                              <Image
                                src={rental.bookId.imageUrl}
                                alt={rental.title}
                                width={80}
                                height={112}
                                className="w-full h-full object-cover opacity-75"
                              />
                            ) : (
                              <span className="text-3xl">📚</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">
                              {rental.title}
                            </h3>
                            <p className="text-gray-700 mb-3 text-lg">
                              by {rental.author}
                            </p>
                            <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                              {rental.genre}
                            </span>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">Rented:</span>{" "}
                                  {rental.rentedDate}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">
                                    Returned:
                                  </span>{" "}
                                  {rental.returnedDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-4">
                          <span className="bg-green-100 text-green-800 px-4 py-2 text-sm font-bold rounded-full shadow-sm border border-green-200">
                            Returned
                          </span>
                          <Button
                            onClick={() =>
                              router.push(`/books/${rental.bookId._id}`)
                            }
                            variant="outline"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">📜</div>
                  <p className="text-gray-600 text-lg">No rental history yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
