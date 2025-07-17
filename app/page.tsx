import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            📚 Book Rental Library
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, rent, and enjoy thousands of books from our digital
            library. Simple, fast, and convenient book rental service.
          </p>

          <div className="flex gap-6 justify-center mb-12 flex-wrap">
            <Link
              href="/books"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📚 Browse Books
            </Link>
            <Link
              href="/api/seed"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ✨ Add Sample Data
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Extensive Collection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through our vast collection of books across various
                genres and authors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Quick Rental
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Rent books instantly with just a few clicks. Simple and
                hassle-free process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Flexible Returns
              </h3>
              <p className="text-gray-600 leading-relaxed">
                14-day rental period with easy return process. No late fees for
                the first week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
