import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";

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

// GET all books
export async function GET() {
  try {
    await connectDB();
    const books = await Book.find({}).sort({ createdAt: -1 });

    // Debug: Log the first book to see what fields are returned
    if (books.length > 0) {
      console.log("Sample book data:", JSON.stringify(books[0], null, 2));
    }

    return NextResponse.json(
      {
        success: true,
        data: books,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch books" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST create new book
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const book = await Book.create(body);

    return NextResponse.json(
      {
        success: true,
        data: book,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create book" },
      { status: 500, headers: corsHeaders }
    );
  }
}
