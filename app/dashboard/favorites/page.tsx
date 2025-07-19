import DashboardLayout from "../../components/DashboardLayout";
import BookCard from "../../components/BookCard";
import Button from "@/app/components/ModernButton";

const mockFavorites = [
  {
    _id: "1",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A coming-of-age story that follows Holden Caulfield, a teenager who has been expelled from prep school.",
    genre: "Classic Fiction",
    publishedYear: 1951,
    availableCopies: 3,
    totalCopies: 5,
    imageUrl: undefined,
  },
  {
    _id: "2",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description:
      "The first book in the beloved Harry Potter series about a young wizard's journey.",
    genre: "Fantasy",
    publishedYear: 1997,
    availableCopies: 2,
    totalCopies: 4,
    imageUrl: undefined,
  },
  {
    _id: "3",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic fantasy tale of good versus evil, set in the fictional world of Middle-earth.",
    genre: "Fantasy",
    publishedYear: 1954,
    availableCopies: 0,
    totalCopies: 3,
    imageUrl: undefined,
  },
  {
    _id: "4",
    title: "Dune",
    author: "Frank Herbert",
    description:
      "A science fiction epic set on the desert planet Arrakis, following Paul Atreides.",
    genre: "Science Fiction",
    publishedYear: 1965,
    availableCopies: 1,
    totalCopies: 2,
    imageUrl: undefined,
  },
];

export default function FavoritesPage() {
  const handleRent = (bookId: string) => {
    console.log("Renting book:", bookId);
    // TODO: Implement rental logic
  };

  const handleRemoveFavorite = (bookId: string) => {
    console.log("Removing from favorites:", bookId);
    // TODO: Implement remove from favorites logic
  };

  return (
    <DashboardLayout
      title="My Favorites"
      subtitle="Books you've added to your favorites list"
    >
      <div className="space-y-6">
        {/* Stats Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Reading Wishlist
              </h2>
              <p className="text-gray-600">
                You have {mockFavorites.length} books in your favorites
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {mockFavorites.length}
              </div>
              <div className="text-sm text-gray-600">Favorite Books</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
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
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {
                    mockFavorites.filter((book) => book.availableCopies > 0)
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {
                    mockFavorites.filter((book) => book.availableCopies === 0)
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Out of Stock</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 [box-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {new Set(mockFavorites.map((book) => book.genre)).size}
                </div>
                <div className="text-sm text-gray-600">Genres</div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {mockFavorites.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Your Favorite Books
              </h2>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="all">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Science Fiction</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFavorites.map((book) => (
                <div key={book._id} className="relative">
                  <BookCard book={book} onRent={handleRent} />
                  <button
                    onClick={() => handleRemoveFavorite(book._id)}
                    className="absolute top-3 left-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
                    title="Remove from favorites"
                  >
                    <svg
                      className="w-4 h-4 text-red-500 group-hover:text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💕</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start adding books to your favorites to see them here!
            </p>
            <Button href="/books" variant="primary">
              Browse Books
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
