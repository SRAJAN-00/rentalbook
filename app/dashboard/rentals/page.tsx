import DashboardLayout from "../../components/DashboardLayout";
import Button from "../../components/ModernButton";

const mockRentals = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    rentedDate: "2025-07-10",
    dueDate: "2025-07-25",
    status: "active",
    daysLeft: 6,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    rentedDate: "2025-07-12",
    dueDate: "2025-07-28",
    status: "active",
    daysLeft: 9,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    rentedDate: "2025-06-30",
    dueDate: "2025-07-15",
    status: "overdue",
    daysLeft: -4,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    rentedDate: "2025-06-20",
    dueDate: "2025-07-05",
    status: "returned",
    returnedDate: "2025-07-03",
  },
];

export default function RentalsPage() {
  const activeRentals = mockRentals.filter(
    (rental) => rental.status === "active" || rental.status === "overdue"
  );
  const returnedRentals = mockRentals.filter(
    (rental) => rental.status === "returned"
  );

  return (
    <DashboardLayout
      title="My Rentals"
      subtitle="Manage your current and past book rentals"
    >
      <div className="space-y-8">
        {/* Active Rentals */}
        <div className="bg-white rounded-xl border border-gray-200 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Active Rentals
              </h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {activeRentals.length} books
              </span>
            </div>
          </div>
          <div className="p-6">
            {activeRentals.length > 0 ? (
              <div className="space-y-4">
                {activeRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {rental.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            by {rental.author}
                          </p>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {rental.genre}
                          </span>
                          <div className="mt-3 space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Rented:</span>{" "}
                              {rental.rentedDate}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Due:</span>{" "}
                              {rental.dueDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            rental.status === "active"
                              ? rental.daysLeft !== undefined &&
                                rental.daysLeft <= 3
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
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
                        <Button variant="outline" size="sm">
                          Return Book
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No active rentals
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

        {/* Rental History */}
        <div className="bg-white rounded-xl border border-gray-200 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Rental History</h2>
          </div>
          <div className="p-6">
            {returnedRentals.length > 0 ? (
              <div className="space-y-4">
                {returnedRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {rental.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            by {rental.author}
                          </p>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {rental.genre}
                          </span>
                          <div className="mt-3 space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Rented:</span>{" "}
                              {rental.rentedDate}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Returned:</span>{" "}
                              {rental.returnedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-semibold rounded-full">
                          Returned
                        </span>
                        <Button variant="outline" size="sm">
                          Rent Again
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No rental history yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
