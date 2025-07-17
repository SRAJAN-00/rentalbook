import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";
import { dummyBooks } from "@/data/books";

export async function POST() {
  try {
    await connectDB();

    // Check if books already exist
    const existingBooks = await Book.countDocuments();
    if (existingBooks > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Books already exist in database",
        },
        { status: 400 }
      );
    }

    // Insert dummy books
    const books = await Book.insertMany(dummyBooks);

    return NextResponse.json({
      success: true,
      message: `Successfully added ${books.length} books`,
      data: books,
    });
  } catch (error) {
    console.error("Error seeding books:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed books" },
      { status: 500 }
    );
  }
}

// DELETE all data (for development)
export async function DELETE() {
  try {
    await connectDB();

    await Book.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All books deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting books:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete books" },
      { status: 500 }
    );
  }
}
