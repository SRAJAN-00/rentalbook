import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import Book from "@/models/Book";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

async function getUserIdFromSession(session: any) {
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email });
    if (user) {
      return user._id;
    }
  }
  return null;
}

// GET reviews for a specific book
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { success: false, error: "Book ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get all reviews for the book
    const reviews = await Review.find({ bookId })
      .sort({ createdAt: -1 })
      .lean();

    // Calculate average rating
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews: reviews.length,
      },
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST create new review
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession(authOptions);
    const userId = await getUserIdFromSession(session);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to write a review" },
        { status: 401, headers: corsHeaders }
      );
    }

    const { bookId, rating, comment } = await request.json();

    // Validate input
    if (!bookId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: "Book ID, rating, and comment are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (comment.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Comment must be at least 10 characters long" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ bookId, userId });
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: "You have already reviewed this book" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create the review
    const review = await Review.create({
      bookId,
      userId,
      rating: Number(rating),
      comment: comment.trim(),
      userName: session?.user?.name || "Anonymous",
      userEmail: session?.user?.email || "",
    });

    return NextResponse.json(
      {
        success: true,
        data: review,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create review" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PUT update existing review
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession(authOptions);
    const userId = await getUserIdFromSession(session);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to update a review" },
        { status: 401, headers: corsHeaders }
      );
    }

    const { reviewId, rating, comment } = await request.json();

    // Validate input
    if (!reviewId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: "Review ID, rating, and comment are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (comment.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Comment must be at least 10 characters long" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Find and update the review (only if user owns it)
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, userId },
      { 
        rating: Number(rating), 
        comment: comment.trim(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found or you don't have permission to update it" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: review,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update review" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE remove review
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession(authOptions);
    const userId = await getUserIdFromSession(session);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to delete a review" },
        { status: 401, headers: corsHeaders }
      );
    }

    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: "Review ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Find and delete the review (only if user owns it)
    const review = await Review.findOneAndDelete({ _id: reviewId, userId });

    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found or you don't have permission to delete it" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Review deleted successfully",
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete review" },
      { status: 500, headers: corsHeaders }
    );
  }
}
