import Button from "./ModernButton";
import DashboardStats from "./DashboardStats";

const recentBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: null,
    dueDate: "2025-07-25",
    status: "active",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverUrl: null,
    dueDate: "2025-07-28",
    status: "active",
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: null,
    dueDate: "2025-07-15",
    status: "overdue",
  },
];

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
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600">
          Manage your rentals and discover new books
        </p>
      </div>

      {/* Statistics Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Rentals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Current Rentals
                </h2>
                <Button
                  href="/dashboard/rentals"
                  variant="outline"
                  size="sm"
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="p-5">
              {recentBooks.length > 0 ? (
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center space-x-4 h-20 p-4 bg-gray-50 rounded-lg"
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
                      <Button variant="outline" size="sm">
                        Return
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
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
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
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
                </div>
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
