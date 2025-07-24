import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Rental from "@/models/Rental";
import Book from "@/models/Book";
import { getServerSession } from "next-auth";

// GET all rentals
export async function GET() {
  try {
    await connectDB();
    const rentals = await Rental.find({})
      .populate("bookId", "title author")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: rentals,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}

// POST create new rental
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to rent a book" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Check if book is available
    const book = await Book.findById(body.bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    if (book.availableCopies <= 0) {
      return NextResponse.json(
        { success: false, error: "Book is not available for rent" },
        { status: 400 }
      );
    }

    // Create rental with due date (14 days from now) and current user info
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const rental = await Rental.create({
      bookId: body.bookId,
      renterName: session.user.name || "Unknown User",
      renterEmail: session.user.email,
      rentDate: new Date(),
      dueDate,
      status: "active",
    });

    // Decrease available copies
    book.availableCopies -= 1;
    await book.save();

    return NextResponse.json(
      {
        success: true,
        data: rental,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating rental:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create rental" },
      { status: 500 }
    );
  }
}
