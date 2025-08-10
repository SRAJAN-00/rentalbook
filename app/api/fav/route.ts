import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";
import Fav from "@/models/Fav";

import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { Session } from "next-auth";

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

async function getUserIdFromSession(session: Session | null) {
  console.log("getUserIdFromSession - session:", session); // Debug log

  // Always look up user by email to get the proper MongoDB ObjectId
  if (session?.user?.email) {
    console.log(
      "getUserIdFromSession - looking up user by email:",
      session.user.email
    ); // Debug log
    const user = await User.findOne({ email: session.user.email });
    if (user) {
      console.log("getUserIdFromSession - found user by email:", user._id); // Debug log
      return user._id; // This returns the proper MongoDB ObjectId
    }
  }
  console.log("getUserIdFromSession - no valid user found"); // Debug log
  return null;
}

// Removed stray export default for getUserIdFromSession; only export as named

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession(authOptions);
    const userId = await getUserIdFromSession(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found or not logged in" },
        { status: 401, headers: corsHeaders }
      );
    }

    const body = await request.json();

    // Check if book exists
    const book = await Book.findById(body.bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check if favorite already exists
    const existingFav = await Fav.findOne({
      bookId: body.bookId,
      userId: userId,
    });
    if (existingFav) {
      return NextResponse.json(
        { success: false, error: "Book is already in favorites" },
        { status: 400, headers: corsHeaders }
      );
    }

    const favBook = await Fav.create({
      bookId: body.bookId,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        data: favBook,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error creating favorite:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create favorite" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession(authOptions);
    const userId = await getUserIdFromSession(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found or not logged in" },
        { status: 401, headers: corsHeaders }
      );
    }

    const body = await request.json();

    // Check if favorite exists
    const existingFav = await Fav.findOne({
      bookId: body.bookId,
      userId: userId,
    });
    if (!existingFav) {
      return NextResponse.json(
        { success: false, error: "Favorite not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Remove from favorites
    await Fav.deleteOne({ _id: existingFav._id });

    return NextResponse.json(
      { success: true, message: "Removed from favorites" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove favorite" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    console.log("GET /api/fav - Session:", session); // Debug log

    const userId = await getUserIdFromSession(session);
    console.log("GET /api/fav - UserId:", userId); // Debug log

    if (!userId) {
      console.log(
        "GET /api/fav - No userId, returning empty array instead of 401"
      ); // Debug log
      return NextResponse.json({
        success: true,
        data: [], // Return empty array instead of error
      }, { headers: corsHeaders });
    }

    // Get only the current user's favorites
    console.log("About to query Fav.find with userId:", userId); // Debug log
    const favorites = await Fav.find({ userId })
      .populate("bookId", "title author imageUrl")
      .sort({ createdAt: -1 });

    console.log(
      "GET /api/fav - Found favorites:",
      favorites.length,
      "for user:",
      userId
    ); // Debug log

    // Double-check: if we got a lot of favorites, something might be wrong
    if (favorites.length > 20) {
      console.warn(
        "WARNING: Found unusually high number of favorites for single user:",
        favorites.length
      );
    }

    return NextResponse.json({
      success: true,
      data: favorites,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch favorites" },
      { status: 500, headers: corsHeaders }
    );
  }
}
