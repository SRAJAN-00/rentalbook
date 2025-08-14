"use client";

import { useState } from "react";

export default function SeedTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    setIsLoading(true);
    setMessage("🗑️ Deleting all books...");

    try {
      const response = await fetch("/api/seed", { 
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Delete successful: ${data.message}`);
      } else {
        setMessage(`⚠️ Delete failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Error during deletion: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeed = async () => {
    setIsLoading(true);
    setMessage("🌱 Seeding books with pricing...");

    try {
      const response = await fetch("/api/seed", { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Seeding successful: ${data.message}`);
      } else {
        setMessage(`⚠️ Seeding failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Error during seeding: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFullReset = async () => {
    setIsLoading(true);
    
    try {
      // First delete
      setMessage("🗑️ Step 1/2: Deleting all books...");
      const deleteResponse = await fetch("/api/seed", { 
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const deleteData = await deleteResponse.json();
      
      if (!deleteData.success) {
        setMessage(`⚠️ Delete failed: ${deleteData.message}`);
        return;
      }

      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Then seed
      setMessage("🌱 Step 2/2: Seeding books with pricing...");
      const seedResponse = await fetch("/api/seed", { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const seedData = await seedResponse.json();

      if (seedData.success) {
        setMessage(`✅ Full reset successful! ${seedData.message}`);
      } else {
        setMessage(`⚠️ Seeding failed: ${seedData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Error during full reset: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 Database Management
          </h1>
          <p className="text-gray-600 mb-8">
            Manage your book database. Delete old books and seed new ones with pricing information.
          </p>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🗑️</span>
                  <span>Delete All Books</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleSeed}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🌱</span>
                  <span>Seed Books</span>
                </>
              )}
            </button>

            <button
              onClick={handleFullReset}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🔄</span>
                  <span>Full Reset</span>
                </>
              )}
            </button>
          </div>

          {message && (
            <div className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-lg font-medium text-gray-900">{message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              💡 Instructions:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Use <strong>"Full Reset"</strong> for the easiest one-click solution</li>
              <li>Or manually: First click <strong>"Delete All Books"</strong></li>
              <li>Then click <strong>"Seed Books"</strong> to add books with pricing</li>
              <li>After seeding, go to <a href="/books" className="underline font-semibold">Books Page</a> to see pricing</li>
            </ol>
          </div>

          <div className="mt-6 flex justify-center">
            <a 
              href="/books" 
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              📖 Go to Books Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
