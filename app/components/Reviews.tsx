"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useReviews } from "../hooks/useReviews";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  editable?: boolean;
  size?: "sm" | "md" | "lg";
}

function StarRating({ rating, onRatingChange, editable = false, size = "md" }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!editable}
          className={`${sizeClasses[size]} ${
            editable ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
          }`}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          onClick={() => editable && onRatingChange?.(star)}
        >
          <svg
            className={`w-full h-full ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300 fill-current"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

interface ReviewFormProps {
  bookId: string;
  existingReview?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function ReviewForm({ bookId, existingReview, onSuccess, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { submitReview, updateReview } = useReviews(bookId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      setError("Comment must be at least 10 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      let success = false;
      
      if (existingReview) {
        success = await updateReview(existingReview._id, rating, comment);
      } else {
        success = await submitReview(rating, comment);
      }

      if (success) {
        onSuccess?.();
        if (!existingReview) {
          setRating(0);
          setComment("");
        }
      }
    } catch (err) {
      setError("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating
        </label>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          editable={true}
          size="lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
          minLength={10}
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {comment.length}/1000 characters (minimum 10)
        </p>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

interface ReviewsProps {
  bookId: string;
}

export default function Reviews({ bookId }: ReviewsProps) {
  const { data: session } = useSession();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  
  const {
    reviews,
    averageRating,
    totalReviews,
    loading,
    error,
    userReview,
    hasUserReviewed,
    deleteReview,
  } = useReviews(bookId);

  const handleDeleteReview = async (reviewId: string) => {
    if (confirm("Are you sure you want to delete your review?")) {
      await deleteReview(reviewId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Reviews ({totalReviews})
          </h3>
          {session && !hasUserReviewed && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Write a Review
            </button>
          )}
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center space-x-4">
            <StarRating rating={averageRating} />
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {averageRating.toFixed(1)} out of 5
            </span>
            <span className="text-gray-500">
              ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
            </span>
          </div>
        )}
      </div>

      {/* Review Form */}
      {session && (showReviewForm || editingReview) && (
        <ReviewForm
          bookId={bookId}
          existingReview={editingReview}
          onSuccess={() => {
            setShowReviewForm(false);
            setEditingReview(null);
          }}
          onCancel={() => {
            setShowReviewForm(false);
            setEditingReview(null);
          }}
        />
      )}

      {/* User's Existing Review */}
      {session && userReview && !editingReview && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Your Review</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingReview(userReview)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteReview(userReview._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          <StarRating rating={userReview.rating} size="sm" />
          <p className="mt-2 text-gray-700 dark:text-gray-300">{userReview.comment}</p>
          <p className="text-xs text-gray-500 mt-2">
            Reviewed on {formatDate(userReview.createdAt)}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-center py-4">{error}</div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.filter(review => review._id !== userReview?._id).map((review) => (
          <div
            key={review._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {review.userName}
                </span>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
          </div>
        ))}

        {totalReviews === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No reviews yet. Be the first to review this book!</p>
          </div>
        )}
      </div>

      {/* Login Prompt */}
      {!session && (
        <div className="text-center py-4 text-gray-500">
          <p>Please log in to write a review.</p>
        </div>
      )}
    </div>
  );
}
