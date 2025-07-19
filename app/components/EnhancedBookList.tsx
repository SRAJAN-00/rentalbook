'use client';

import { useState, useEffect, useMemo } from 'react';
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

interface FilterState {
  search: string;
  genre: string;
  availability: string;
  sortBy: string;
}

export default function EnhancedBookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [renterName, setRenterName] = useState('');
  const [renterEmail, setRenterEmail] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    genre: '',
    availability: '',
    sortBy: 'title'
  });

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

  // Get unique genres for filter dropdown
  const availableGenres = useMemo(() => {
    const genres = books.map(book => book.genre).filter(Boolean);
    return [...new Set(genres)].sort();
  }, [books]);

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
        book.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesGenre = !filters.genre || book.genre === filters.genre;
      
      const matchesAvailability = 
        !filters.availability ||
        (filters.availability === 'available' && book.availableCopies > 0) ||
        (filters.availability === 'unavailable' && book.availableCopies === 0);

      return matchesSearch && matchesGenre && matchesAvailability;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return b.publishedYear - a.publishedYear;
        case 'availability':
          return b.availableCopies - a.availableCopies;
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      genre: '',
      availability: '',
      sortBy: 'title'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="absolute inset-0 inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          </div>
          <p className="mt-6 text-gray-700 text-lg font-medium">Loading your books...</p>
          <p className="text-gray-500">Finding the perfect reads for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">�</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchBooks} variant="primary" size="lg">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Browse Books
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Discover amazing stories, expand your knowledge, and find your next favorite book from our curated collection
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{books.length} Books Available</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>Free to Browse</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 [box-shadow:0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Book</h2>
            <p className="text-gray-600">Use our smart filters to discover books tailored to your interests</p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title, author, or description..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 [box-shadow:0_4px_12px_rgba(0,0,0,0.05)]"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => updateFilter('genre', e.target.value)}
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
              >
                <option value="">All Genres</option>
                {availableGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => updateFilter('availability', e.target.value)}
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
              >
                <option value="">All Books</option>
                <option value="available">📗 Available Now</option>
                <option value="unavailable">📕 Currently Rented</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
              >
                <option value="title">📖 Title A-Z</option>
                <option value="author">👤 Author A-Z</option>
                <option value="year">📅 Newest First</option>
                <option value="availability">✅ Most Available</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              {(filters.search || filters.genre || filters.availability) ? (
                <Button 
                  onClick={clearFilters} 
                  variant="outline" 
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </Button>
              ) : (
                <div className="w-full p-3 text-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                  No filters active
                </div>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredAndSortedBooks.length}</span> of <span className="font-semibold text-gray-900">{books.length}</span> books
              </span>
              {filteredAndSortedBooks.length !== books.length && (
                <span className="text-blue-600 font-medium">
                  🔍 Filtered results
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Books Grid or Empty State */}
        {books.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg mx-auto">
              <div className="text-8xl mb-6">📚</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No Books Yet
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Get started by adding some sample books to see how amazing our library can be!
              </p>
              <Button onClick={seedData} variant="primary" size="lg" className="px-8 py-4">
                <span className="text-xl mr-2">🚀</span>
                Add Sample Books
              </Button>
            </div>
          </div>
        ) : filteredAndSortedBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg mx-auto">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No Books Found
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We couldn't find any books matching your search criteria. Try adjusting your filters to discover more books.
              </p>
              <Button onClick={clearFilters} variant="primary" size="lg" className="px-8 py-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedBooks.map((book) => (
              <div key={book._id} className="transform hover:scale-105 transition-transform duration-300">
                <BookCard book={book} onRent={handleRent} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rental Modal */}
      {showRentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">📖</div>
              <h3 className="text-2xl font-bold text-gray-900">
                Rent This Book
              </h3>
              <p className="text-gray-600 mt-2">
                Enter your details to rent this book
              </p>
            </div>

            <form onSubmit={submitRental} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  📚 Rent Book
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
