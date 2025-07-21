import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";
import OptimizedBookList from "../components/OptimizedBookList";
import DashboardLayout from "../components/DashboardLayout";

// Server-side data fetching for fast initial load
async function getBooks() {
  try {
    await connectDB();
    const books = await Book.find({}).lean().exec(); // .lean() for better performance
    return JSON.parse(JSON.stringify(books)); // Serialize for client
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export default async function BooksPage() {
  // ⚡ Data fetched on server BEFORE page loads
  const initialBooks = await getBooks();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">
          Discover and rent books from our collection
        </p>
      </div>

      {/* ⚡ No loading spinner - data is pre-loaded! */}
      <OptimizedBookList initialBooks={initialBooks} />
    </DashboardLayout>
  );
}
