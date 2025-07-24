"use client";
import { useState, useEffect } from "react";
import Button from "./ModernButton";
import DashboardStats from "./DashboardStats";
import { init } from "next/dist/compiled/webpack/webpack";
import { AnimatePresence, motion } from "motion/react";

const recentActivity = [
  {
    id: "1",
    action: "Rented",
    book: "The Great Gatsby",
    time: "2 hours ago",
    icon: (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "2",
    action: "Returned",
    book: "Pride and Prejudice",
    time: "1 day ago",
    icon: (
      <svg
        className="w-4 h-4 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "3",
    action: "Added to favorites",
    book: "The Catcher in the Rye",
    time: "3 days ago",
    icon: (
      <svg
        className="w-4 h-4 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

export default function DashboardContent() {
  const [recentBooks, setRecentBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch("/api/user/rentals");
        const data = await response.json();

        if (data.success) {
          // Transform rental data to match UI expectations
          const transformedRentals = data.data.map(
            (rental: {
              _id: any;
              bookId: { _id: any; title: any; author: any };
              dueDate: string | number | Date;
              status: any;
            }) => ({
              id: rental._id,
              bookId: rental.bookId?._id || rental.bookId, // Use the actual book ID
              title: rental.bookId?.title || "Unknown Title",
              author: rental.bookId?.author || "Unknown Author",
              dueDate: new Date(rental.dueDate).toLocaleDateString(),
              status: rental.status,
            })
          );
          setRecentBooks(transformedRentals);
        }
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);
  function enterAnimation(
    delay: number = 0.3,
    x: number = 0,
    duration: number = 0.4
  ) {
    return {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay, duration },
    };
  }

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <motion.h2
          {...enterAnimation(0.1)}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Welcome to Your Dashboard
        </motion.h2>
        <motion.p {...enterAnimation(0.2)} className="text-gray-600">
          Manage your rentals and discover new books
        </motion.p>
      </div>

      {/* Statistics Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Rentals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Current Rentals
                </h2>
                <Button href="/dashboard/rentals" variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </div>
            <div className="p-5">
              <AnimatePresence>
                {recentBooks.length > 0 ? (
                  <div key="rentals-list" className="space-y-4">
                    {recentBooks.map((book, idx) => (
                      <motion.div
                        {...enterAnimation(0.1 + idx * 0.1)}
                        key={book.id}
                        className="flex items-center space-x-4 h-20 p-4 bg-gray-50 rounded-lg"
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "#f8fafc",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                      >
                        <div className="w-12 h-16 bg-gradient-to-br  from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            by {book.author}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-gray-500">
                              Due: {book.dueDate}
                            </span>
                            <span
                              className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                                book.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {book.status === "active" ? "Active" : "Overdue"}
                            </span>
                          </div>
                        </div>
                        <Button
                          href={`/books/${book.bookId}`}
                          variant="outline"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div key="no-rentals" className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No current rentals
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start exploring our book collection!
                    </p>
                    <Button href="/books" variant="primary">
                      Browse Books
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start space-x-3"
                  {...enterAnimation(0.1 + idx * 0.05)}
                  whileHover={{
                    x: 5,
                    backgroundColor: "#f8fafc",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>{" "}
                      <span className="text-blue-600">{activity.book}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reading Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              This Month's Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Reading Goal</span>
                  <span className="font-medium text-gray-900">3/5 books</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Reading Time</span>
                  <span className="font-medium text-gray-900">127h / 150h</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
