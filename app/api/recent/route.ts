import connectDB from "@/lib/mongodb";
import Activity from "@/models/Activity";
import User from "@/models/User";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book";
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
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email });
    if (user) {
      return user._id;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    console.log("POST /api/recent - Starting request");

    const session = await getServerSession(authOptions);
    console.log("POST /api/recent - Session:", session);

    const userId = await getUserIdFromSession(session);
    console.log("POST /api/recent - UserId:", userId);

    if (!userId) {
      console.log("POST /api/recent - No userId, returning 401");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const { bookId } = await request.json();
    console.log("POST /api/recent - BookId received:", bookId);

    if (!bookId) {
      console.log("POST /api/recent - No bookId provided");
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log("POST /api/recent - Looking up book with ID:", bookId);
    const book = await Book.findById(bookId);
    console.log(
      "POST /api/recent - Book found:",
      book ? `${book.title} by ${book.author}` : "null"
    );

    if (!book) {
      console.log("POST /api/recent - Book not found, returning 404");
      return NextResponse.json(
        { success: false, error: " Book not found" },
        { status: 404 }
      );
    }
    console.log("POST /api/recent - Checking for existing activity");
    const checkRecent = await Activity.findOne({
      bookId: bookId,
      userId: userId,
      action: "viewed",
    }).sort({ timestamp: -1 });

    console.log(
      "POST /api/recent - Existing activity found:",
      checkRecent ? "Yes" : "No"
    );

    if (!checkRecent) {
      console.log("POST /api/recent - Creating new activity with data:", {
        bookId,
        userId,
        action: "viewed",
        bookTitle: book.title,
        bookAuthor: book.author,
      });

      const activity = await Activity.create({
        bookId: bookId,
        userId: userId,
        action: "viewed",
        bookTitle: book.title,
        bookAuthor: book.author,
        timestamp: new Date(),
      });

      console.log(
        "POST /api/recent - Activity created successfully:",
        activity._id
      );

      return NextResponse.json(
        {
          success: true,
          data: activity,
        },
        { status: 201 }
      );
    }

    console.log("POST /api/recent - Activity already exists, returning 400");
    return NextResponse.json(
      { success: false, error: "Activity already exists" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in POST /api/recent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    console.log("GET /api/recent - Starting request");

    const session = await getServerSession(authOptions);
    console.log("GET /api/recent - Session:", session);

    const userId = await getUserIdFromSession(session);
    console.log("GET /api/recent - UserId:", userId);

    if (!userId) {
      console.log("GET /api/recent - No userId, returning 401");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET /api/recent - Fetching activities for user:", userId);
    // Get recent activities for the user (last 10, most recent first)
    const activities = await Activity.find({
      userId: userId,
    })
      .populate("bookId", "title author imageUrl")
      .sort({ timestamp: -1 })
      .limit(10);

    console.log("GET /api/recent - Found activities:", activities.length);
    console.log(
      "GET /api/recent - Activities:",
      activities.map((a) => ({
        action: a.action,
        bookTitle: a.bookTitle,
        timestamp: a.timestamp,
      }))
    );

    return NextResponse.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error("Error in GET /api/recent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
