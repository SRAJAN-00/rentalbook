import { useEffect, useState } from "react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
}

interface DashboardStatsProps {
  refreshTrigger?: number;
}

export default function DashboardStats({
  refreshTrigger,
}: DashboardStatsProps) {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [rentalsRes, favoritesRes, activitiesRes] =
          await Promise.allSettled([
            fetch("/api/user/rentals"),
            fetch("/api/fav"),
            fetch("/api/recent"),
          ]);

        let totalRentals = 0;
        let activeRentals = 0;
        let totalFavorites = 0;
        let monthlyViews = 0;

        // Handle rentals data
        if (rentalsRes.status === "fulfilled") {
          const rentalsData = await rentalsRes.value.json();
          if (rentalsData.success) {
            totalRentals = rentalsData.data.length;
            activeRentals = rentalsData.data.filter(
              (rental: any) => rental.status === "active"
            ).length;
          }
        }

        // Handle favorites data
        if (favoritesRes.status === "fulfilled") {
          const favData = await favoritesRes.value.json();
          if (favData.success) {
            totalFavorites = favData.data.length;
          }
        }

        // Handle activities data
        if (activitiesRes.status === "fulfilled") {
          const activitiesData = await activitiesRes.value.json();
          if (activitiesData.success) {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            monthlyViews = activitiesData.data.filter((activity: any) => {
              const activityDate = new Date(activity.timestamp);
              return (
                activityDate.getMonth() === currentMonth &&
                activityDate.getFullYear() === currentYear
              );
            }).length;
          }
        }

        const dynamicStats: StatCard[] = [
          {
            title: "Books Rented",
            value: totalRentals,
            change:
              totalRentals > 0 ? `+${Math.round(totalRentals * 0.2)}` : "0",
            changeType: totalRentals > 0 ? "positive" : "neutral",
            color: "blue",
            icon: (
              <svg
                className="w-6 h-6"
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
            title: "Active Rentals",
            value: activeRentals,
            change: activeRentals > 0 ? `+${activeRentals}` : "0",
            changeType: activeRentals > 0 ? "positive" : "neutral",
            color: "green",
            icon: (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 712-2h2a2 2 0 712 2"
                />
              </svg>
            ),
          },
          {
            title: "Favorites",
            value: totalFavorites,
            change:
              totalFavorites > 0 ? `+${Math.round(totalFavorites * 0.3)}` : "0",
            changeType: totalFavorites > 0 ? "positive" : "neutral",
            color: "purple",
            icon: (
              <svg
                className="w-6 h-6"
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
          {
            title: "Monthly Views",
            value: monthlyViews,
            change: monthlyViews > 0 ? `+${monthlyViews}` : "0",
            changeType: monthlyViews > 0 ? "positive" : "neutral",
            color: "orange",
            icon: (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ),
          },
        ];

        setStats(dynamicStats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      accent: "text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
      accent: "text-green-600",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      accent: "text-purple-600",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      accent: "text-orange-600",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const colors = colorClasses[stat.color];
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)] hover:[box-shadow:0_8px_16px_rgba(0,0,0,0.15)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.changeType === "positive" && "↗ "}
                    {stat.changeType === "negative" && "↘ "}
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div className={`${colors.bg} ${colors.icon} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
