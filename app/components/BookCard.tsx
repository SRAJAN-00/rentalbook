import Image from "next/image";
import Fav from "./fav";
import Button from "./ModernButton";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  imageUrl?: string;
}

interface BookCardProps {
  book: Book;
  onRent?: (bookId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (bookId: string, isFav: boolean) => void;
}

export default function BookCard({
  book,
  onRent,
  isFavorite = false,
  onToggleFavorite,
}: BookCardProps) {
  const isAvailable = book.availableCopies > 0;

  if (!book._id) {
    console.warn("BookCard: book._id is missing! Book object:", book);
  }
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
      {/* Image Section with Heart Icon */}
      <div className="h-48 relative rounded-t-xl flex-shrink-0 overflow-hidden">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={300}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">�</div>
              <span className="text-gray-500 text-sm font-medium">
                No Image
              </span>
            </div>
          </div>
        )}

        {/* Availability Badge */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold shadow-lg ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isAvailable ? `${book.availableCopies} left` : "Unavailable"}
        </div>

        {/* Heart Icon - Positioned in top right */}
        <div className="absolute top-3 right-3 z-10">
          <Fav
            bookId={book._id}
            isFavorite={isFavorite}
            onToggle={onToggleFavorite || (() => {})}
          />
        </div>

        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Title and Author */}
        <div className="mb-3">
          <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-blue-600 font-medium text-sm">by {book.author}</p>
        </div>

        {/* Genre and Year */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {book.genre}
          </span>
          <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
            {book.publishedYear}
          </span>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-sm">
            <div className="text-gray-600 font-medium flex items-center gap-1">
              <span className="text-gray-800 font-bold">
                {book.availableCopies}
              </span>
              <span className="text-gray-500">of</span>
              <span className="text-gray-500">{book.totalCopies}</span>
            </div>
            <div className="text-xs text-gray-500">copies available</div>
          </div>

          <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
            {isAvailable ? (
              <Link href={`/books/${book._id}`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs font-bold px-4 py-2 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  View Details
                </Button>
              </Link>
            ) : (
              <span className="text-xs text-red-500 font-medium bg-red-50 px-3 py-1.5 rounded-full border border-red-200 block text-center sm:inline-block">
                📵 Not Available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
