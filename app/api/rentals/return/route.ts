import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Rental from "@/models/Rental";
import Book from "@/models/Book";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the active rental for this user and book
    const activeRental = await Rental.findOne({
      renterEmail: session.user.email,
      bookId: bookId,
      status: "active",
    });

    if (!activeRental) {
      return NextResponse.json(
        { error: "No active rental found for this book" },
        { status: 404 }
      );
    }

    // Update the rental status to returned
    activeRental.status = "returned";
    activeRental.returnDate = new Date();
    await activeRental.save();

    // Update book available copies
    await Book.findByIdAndUpdate(bookId, {
      $inc: { availableCopies: 1 },
    });

    return NextResponse.json({
      success: true,
      message: "Book returned successfully",
      rental: activeRental,
    });
  } catch (error) {
    console.error("Error returning book:", error);
    return NextResponse.json(
      { error: "Failed to return book" },
      { status: 500 }
    );
  }
}
