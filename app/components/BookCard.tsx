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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border">
      <div className="aspect-[3/2] relative rounded-xl">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover p-5 rounded-2xl "
          />
        ) : (
          <div className="w-full  bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📖</div>
              <span className="text-gray-600 text-sm">Book Cover</span>
            </div>
          </div>
        )}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isAvailable ? `${book.availableCopies} Available` : "Out of Stock"}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-blue-600 font-medium mb-3">by {book.author}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
          <span className="text-gray-500 text-sm">{book.publishedYear}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {book.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500">Available: </span>
            <span className="font-semibold text-gray-700">
              {book.availableCopies}/{book.totalCopies}
            </span>
          </div>
          {isAvailable && onRent && (
            <button
              onClick={() => onRent(book._id)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Rent Now
            </button>
          )}
          {!isAvailable && (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
