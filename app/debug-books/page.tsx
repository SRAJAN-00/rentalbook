"use client";

import { useState, useEffect } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  rentalPrice?: number;
  purchasePrice?: number;
  [key: string]: string | number | boolean | undefined;
}

export default function DebugBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        console.log("Books API response:", data);
        if (data.success) {
          setBooks(data.data);
          // Log the first book to see its structure
          if (data.data.length > 0) {
            console.log("First book structure:", data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Books Data</h1>
      <p className="mb-4">Found {books.length} books</p>
      
      <div className="space-y-4">
        {books.slice(0, 3).map((book, index) => (
          <div key={book._id || index} className="border p-4 rounded">
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Rental Price: {book.rentalPrice !== undefined ? `$${book.rentalPrice}` : 'NOT SET'}</p>
            <p>Purchase Price: {book.purchasePrice !== undefined ? `$${book.purchasePrice}` : 'NOT SET'}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600">Show full object</summary>
              <pre className="text-xs bg-gray-100 p-2 mt-2 overflow-auto">
                {JSON.stringify(book, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
