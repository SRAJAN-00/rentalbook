"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function PopularBooksSection() {
  const router = useRouter();

  const popularBooks = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Literature",
      rating: 4.8,
      reviews: 234,
      available: true,
      gradient: "from-blue-400 via-purple-500 to-indigo-600",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      rating: 4.9,
      reviews: 189,
      available: true,
      gradient: "from-green-400 via-blue-500 to-purple-600",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      rating: 4.7,
      reviews: 312,
      available: false,
      gradient: "from-red-400 via-pink-500 to-purple-600",
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      rating: 4.8,
      reviews: 276,
      available: true,
      gradient: "from-pink-400 via-rose-500 to-red-600",
    },
    {
      id: "5",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming of Age",
      rating: 4.6,
      reviews: 198,
      available: true,
      gradient: "from-orange-400 via-red-500 to-pink-600",
    },
    {
      id: "6",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      rating: 4.9,
      reviews: 456,
      available: true,
      gradient: "from-purple-400 via-indigo-500 to-blue-600",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular Books
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Discover what our community is reading right now
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Book Cover */}
              <div
                className={`h-32 bg-gradient-to-br ${book.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="text-4xl text-white/90">📚</div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm">
                      by {book.author}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.available ? "Available" : "Rented"}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {book.genre}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-xs font-medium text-gray-900">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/books/${book.id}`)}
                  className={`w-full py-2 px-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 ${
                    book.available
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!book.available}
                >
                  {book.available ? "Rent Now" : "Unavailable"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/books")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Explore All Books →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
