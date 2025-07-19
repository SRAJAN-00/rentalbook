'use client';

import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import Button from './ModernButton';

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

export default function SimpleBookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [renterName, setRenterName] = useState('');
  const [renterEmail, setRenterEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const result = await response.json();

      if (result.success) {
        setBooks(result.data);
      } else {
        setError('Failed to fetch books');
      }
    } catch (error) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const handleRent = (bookId: string) => {
    setSelectedBookId(bookId);
    setShowRentModal(true);
  };

  const submitRental = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: selectedBookId,
          renterName,
          renterEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Book rented successfully!');
        setShowRentModal(false);
        setRenterName('');
        setRenterEmail('');
        fetchBooks();
      } else {
        alert(result.error || 'Failed to rent book');
      }
    } catch (error) {
      alert('Error renting book');
    }
  };

  const seedData = async () => {
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });
      const result = await response.json();

      if (result.success) {
        alert('Sample books added successfully!');
        fetchBooks();
      } else {
        alert(result.message || 'Failed to seed data');
      }
    } catch (error) {
      alert('Error seeding data');
    }
  };

  // Simple search filter
  const filteredBooks = books.filter(book => 
    searchTerm === '' || 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchBooks} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Browse Books
        </h1>
        <p className="text-gray-600">
          Discover and rent books from our collection
        </p>
      </div>

      {/* Simple Search */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
        </p>
      </div>

      {/* Books Grid or Empty State */}
      {books.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">📚</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No Books Available
          </h3>
          <p className="text-gray-600 mb-6">
            Start by adding some sample books to get started.
          </p>
          <Button onClick={seedData} variant="primary" size="lg">
            Add Sample Books
          </Button>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No Books Found
          </h3>
          <p className="text-gray-600 mb-6">
            Try a different search term.
          </p>
          <Button 
            onClick={() => setSearchTerm('')} 
            variant="outline"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onRent={handleRent} />
          ))}
        </div>
      )}

      {/* Simple Rental Modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Rent This Book
            </h3>
            
            <form onSubmit={submitRental} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  Rent Book
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowRentModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
