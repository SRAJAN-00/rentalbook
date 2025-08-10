import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

interface Review {
  _id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}

interface UseReviewsReturn {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  loading: boolean;
  error: string | null;
  userReview: Review | null;
  hasUserReviewed: boolean;
  submitReview: (rating: number, comment: string) => Promise<boolean>;
  updateReview: (reviewId: string, rating: number, comment: string) => Promise<boolean>;
  deleteReview: (reviewId: string) => Promise<boolean>;
  refreshReviews: () => Promise<void>;
}

export function useReviews(bookId: string): UseReviewsReturn {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get current user's review
  const userReview = reviews.find(
    (review) => review.userEmail === session?.user?.email
  ) || null;
  const hasUserReviewed = !!userReview;

  // Fetch reviews for the book
  const fetchReviews = useCallback(async () => {
    if (!bookId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/reviews?bookId=${bookId}`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.data.reviews);
        setAverageRating(data.data.averageRating);
        setTotalReviews(data.data.totalReviews);
      } else {
        setError(data.error || "Failed to fetch reviews");
      }
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  // Submit a new review
  const submitReview = async (rating: number, comment: string): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchReviews(); // Refresh reviews after submission
        return true;
      } else {
        setError(data.error || "Failed to submit review");
        return false;
      }
    } catch (err) {
      setError("Failed to submit review");
      console.error("Error submitting review:", err);
      return false;
    }
  };

  // Update an existing review
  const updateReview = async (reviewId: string, rating: number, comment: string): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch("/api/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchReviews(); // Refresh reviews after update
        return true;
      } else {
        setError(data.error || "Failed to update review");
        return false;
      }
    } catch (err) {
      setError("Failed to update review");
      console.error("Error updating review:", err);
      return false;
    }
  };

  // Delete a review
  const deleteReview = async (reviewId: string): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch(`/api/reviews?reviewId=${reviewId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchReviews(); // Refresh reviews after deletion
        return true;
      } else {
        setError(data.error || "Failed to delete review");
        return false;
      }
    } catch (err) {
      setError("Failed to delete review");
      console.error("Error deleting review:", err);
      return false;
    }
  };

  // Refresh reviews manually
  const refreshReviews = async () => {
    await fetchReviews();
  };

  // Fetch reviews on mount and when bookId changes
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    averageRating,
    totalReviews,
    loading,
    error,
    userReview,
    hasUserReviewed,
    submitReview,
    updateReview,
    deleteReview,
    refreshReviews,
  };
}
