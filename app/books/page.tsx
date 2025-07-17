import BookList from "../components/BookList";

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 Book Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing books from our curated collection. Find your next
            great read!
          </p>
        </div>
        <BookList />
      </div>
    </div>
  );
}
