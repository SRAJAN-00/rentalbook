import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Rental from "@/models/Rental";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user has an active rental for this book
    const existingRental = await Rental.findOne({
      renterEmail: session.user.email,
      bookId: bookId,
      status: "active",
    });

    return NextResponse.json({
      success: true,
      isRented: !!existingRental,
      rental: existingRental,
    });
  } catch (error) {
    console.error("Error checking rental status:", error);
    return NextResponse.json(
      { error: "Failed to check rental status" },
      { status: 500 }
    );
  }
}
