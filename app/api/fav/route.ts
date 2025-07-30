import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";
import Fav from "@/models/Fav";

import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getUserIdFromSession(session: any) {
  if (session?.user?.id) return session.user.id;
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email });
    if (user) return user._id;
  }
  return null;
}

export default getUserIdFromSession;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession();
    const userId = await getUserIdFromSession(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found or not logged in" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Check if book exists
    const book = await Book.findById(body.bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
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
        { status: 400 }
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
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating favorite:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession();
    const userId = await getUserIdFromSession(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found or not logged in" },
        { status: 401 }
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
        { status: 404 }
      );
    }

    // Remove from favorites
    await Fav.deleteOne({ _id: existingFav._id });

    return NextResponse.json(
      { success: true, message: "Removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // Get current user session
    const session = await getServerSession();
    const userId = await getUserIdFromSession(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found or not logged in" },
        { status: 401 }
      );
    }

    // Get user's favorite books
    const favorites = await Fav.find({ userId: userId }).populate("bookId");
    return NextResponse.json(
      { success: true, data: favorites },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}
