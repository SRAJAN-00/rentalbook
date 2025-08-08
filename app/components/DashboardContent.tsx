"use client";
import { useState, useEffect } from "react";
import Button from "./ModernButton";
import DashboardStats from "./DashboardStats";
import { useRecent } from "../hooks/useRecent";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardContent() {
  // Animation helper function
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

  const [recentBooks, setRecentBooks] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoadingRentals, setIsLoadingRentals] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [progressStats, setProgressStats] = useState({
    currentRentals: 0,
    monthlyGoal: 5,
    completedThisMonth: 0,
    totalViewsThisMonth: 0,
    avgReadingTimeGoal: 150,
  });
  const { fetchRecentActivities } = useRecent();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch both rentals and activities in parallel
      const [rentalsPromise, activitiesPromise] = await Promise.allSettled([
        // Fetch rentals
        fetch("/api/user/rentals").then(async (response) => {
          const data = await response.json();
          if (data.success) {
            const transformedRentals = data.data.map(
              (rental: {
                _id: any;
                bookId: { _id: any; title: any; author: any; imageUrl?: any };
                dueDate: string | number | Date;
                status: any;
              }) => ({
                id: rental._id,
                bookId: rental.bookId?._id || rental.bookId,
                title: rental.bookId?.title || "Unknown Title",
                author: rental.bookId?.author || "Unknown Author",
                imageUrl: rental.bookId?.imageUrl || null,
                dueDate: new Date(rental.dueDate).toLocaleDateString(),
                status: rental.status,
              })
            );
            return transformedRentals;
          }
          return [];
        }),
        // Fetch recent activities
        fetchRecentActivities().then((activities) => activities.slice(0, 5)),
      ]);

      // Handle rentals result
      if (rentalsPromise.status === "fulfilled") {
        setRecentBooks(rentalsPromise.value);

        // Calculate progress stats from real data
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        setProgressStats((prev) => ({
          ...prev,
          currentRentals: rentalsPromise.value.length,
          completedThisMonth: rentalsPromise.value.filter((rental: any) => {
            const rentalDate = new Date(rental.dueDate);
            return (
              rentalDate.getMonth() === currentMonth &&
              rentalDate.getFullYear() === currentYear &&
              rental.status === "completed"
            );
          }).length,
        }));
      } else {
        console.error("Error fetching rentals:", rentalsPromise.reason);
      }
      setIsLoadingRentals(false);

      // Handle activities result
      if (activitiesPromise.status === "fulfilled") {
        setRecentActivities(activitiesPromise.value);

        // Calculate monthly views from activities
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyViews = activitiesPromise.value.filter((activity: any) => {
          const activityDate = new Date(activity.timestamp);
          return (
            activityDate.getMonth() === currentMonth &&
            activityDate.getFullYear() === currentYear
          );
        }).length;

        setProgressStats((prev) => ({
          ...prev,
          totalViewsThisMonth: monthlyViews,
        }));
      } else {
        console.error(
          "Error fetching recent activities:",
          activitiesPromise.reason
        );
      }
      setIsLoadingActivities(false);
    };

    fetchData();
  }, [fetchRecentActivities]);

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
                {isLoadingRentals ? (
                  <div key="loading-rentals" className="space-y-4">
                    {[...Array(3)].map((_, idx) => (
                      <div
                        key={`skeleton-${idx}`}
                        className="flex items-center space-x-4 h-20 p-4 bg-gray-50 rounded-lg animate-pulse"
                      >
                        <div className="w-12 h-16 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="w-20 h-8 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : recentBooks.length > 0 ? (
                  <div key="rentals-list" className="space-y-4">
                    {recentBooks.map((book, idx) => (
                      <motion.div
                        key={`rental-${book.id || idx}`}
                        {...enterAnimation(0.1 + idx * 0.1)}
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
                        <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          {book.imageUrl ? (
                            <Image
                              src={book.imageUrl}
                              alt={book.title}
                              width={48}
                              height={64}
                              loading="lazy"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-2xl">📚</span>
                          )}
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
              Recently Viewed
            </h2>
            <div className="space-y-4">
              {isLoadingActivities ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={`activity-skeleton-${idx}`}
                      className="flex items-start space-x-3 animate-pulse"
                    >
                      <div className="flex-shrink-0 w-10 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : recentActivities.length > 0 ? (
                recentActivities.map((activity: any, idx: number) => (
                  <motion.div
                    key={`activity-${activity._id || idx}`}
                    className="flex items-start space-x-3"
                    {...enterAnimation(0.1 + idx * 0.05)}
                    whileHover={{
                      x: 5,
                      backgroundColor: "#f8fafc",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      {activity.bookId?.imageUrl ? (
                        <Image
                          src={activity.bookId.imageUrl}
                          alt={activity.bookTitle}
                          width={50}
                          height={60}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-lg">📚</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Viewed</span>{" "}
                        <span className="text-blue-600 truncate">
                          {activity.bookTitle || activity.bookId?.title}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        by {activity.bookAuthor || activity.bookId?.author}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/books/${activity.bookId?._id || activity.bookId}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1"
                      >
                        View
                      </Button>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">👀</div>
                  <p className="text-sm text-gray-600">
                    No recent activity yet
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Start browsing books to see your activity here
                  </p>
                </div>
              )}
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
                  <span className="font-medium text-gray-900">
                    {progressStats.completedThisMonth}/
                    {progressStats.monthlyGoal} books
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (progressStats.completedThisMonth /
                          progressStats.monthlyGoal) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Books Explored</span>
                  <span className="font-medium text-gray-900">
                    {progressStats.totalViewsThisMonth} views this month
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (progressStats.totalViewsThisMonth / 20) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Active Rentals</span>
                  <span className="font-medium text-gray-900">
                    {progressStats.currentRentals} currently rented
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (progressStats.currentRentals / 3) * 100
                      )}%`,
                    }}
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
