"use client";

import { useState } from "react";

export default function SeedTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleApiCall = async (method: "POST" | "DELETE", action: string) => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/seed", { method });
      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${action} successful: ${data.message}`);
      } else {
        setMessage(`⚠️ ${action} failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Error during ${action.toLowerCase()}: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeed = () => handleApiCall("POST", "Seeding");
  const handleClear = () => handleApiCall("DELETE", "Database clear");

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Database Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your book database with seed and clear operations
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleSeed}
            disabled={isLoading}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Processing..." : "Seed Database (18 Books)"}
          </button>

          <button
            onClick={handleClear}
            disabled={isLoading}
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Processing..." : "Clear Database"}
          </button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : message.includes("⚠️")
                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <p className="font-medium">{message}</p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>
            <strong>Seed:</strong> Adds 18 books to the database (if empty)
          </p>
          <p>
            <strong>Clear:</strong> Removes all books from the database
          </p>
        </div>
      </div>
    </div>
  );
}
