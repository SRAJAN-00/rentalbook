"use client";

import { useState, useEffect } from "react";

interface BookRatingProps {
  bookId: string;
  showCount?: boolean;
  size?: "sm" | "md";
}

interface RatingData {
  averageRating: number;
  totalReviews: number;
}

export default function BookRating({ bookId, showCount = true, size = "sm" }: BookRatingProps) {
  const [ratingData, setRatingData] = useState<RatingData>({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(`/api/reviews?bookId=${bookId}`);
        const data = await response.json();
        
        if (data.success) {
          setRatingData({
            averageRating: data.data.averageRating,
            totalReviews: data.data.totalReviews,
          });
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchRating();
    }
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex space-x-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} bg-gray-200 rounded animate-pulse`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (ratingData.totalReviews === 0) {
    return (
      <div className="flex items-center space-x-1 text-gray-400">
        <span className={`${size === "sm" ? "text-xs" : "text-sm"}`}>No reviews yet</span>
      </div>
    );
  }

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.round(ratingData.averageRating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300 fill-current"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
        {ratingData.averageRating.toFixed(1)}
      </span>
      {showCount && (
        <span className={`${textSizeClasses[size]} text-gray-500`}>
          ({ratingData.totalReviews})
        </span>
      )}
    </div>
  );
}
