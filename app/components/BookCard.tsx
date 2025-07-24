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
}

export default function BookCard({ book, onRent }: BookCardProps) {
  const isAvailable = book.availableCopies > 0;

  return (
    <Link href={`/books/${book._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 border h-70 flex flex-col cursor-pointer">
        <div className="h-40 relative rounded-lg flex-shrink-0">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-full object-cover p-2 rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg mb-0.5">📖</div>
                <span className="text-gray-500 text-xs">Book</span>
              </div>
            </div>
          )}
          <div
            className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-xs font-medium shadow-sm ${
              isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isAvailable ? `${book.availableCopies}` : "0"}
          </div>
        </div>

        <div className="p-3 flex-grow flex flex-col">
          <h3 className="font-bold text-sm mb-1 text-gray-900 line-clamp-1 leading-tight">
            {book.title}
          </h3>
          <p className="text-blue-600 font-medium mb-1.5 text-xs">
            by {book.author}
          </p>

          <div className="flex items-center gap-1.5 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
              {book.genre}
            </span>
            <span className="text-gray-500 text-xs">{book.publishedYear}</span>
          </div>

          <div className="flex justify-between items-center ">
            <div className="text-xs">
              <span className="text-gray-500">
                {book.availableCopies}/{book.totalCopies}
              </span>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              {isAvailable && (
                <Button
                  href={`/books/${book._id}`}
                  variant="primary"
                  size="sm"
                  className="text-xs font-semibold transform hover:scale-105 transition-transform duration-200"
                >
                  Rent Now
                </Button>
              )}
              {!isAvailable && (
                <span className="text-xs text-red-500 font-medium">
                  Not Available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
