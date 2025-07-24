import connectDB from "@/lib/mongodb";
import Rental from "@/models/Rental";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "User email not found",
        },
        {
          status: 400,
        }
      );
    }
    const rentals = await Rental.find({ renterEmail: userEmail })
      .populate("bookId", "title author")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: rentals,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "not found",
      },
      {
        status: 500,
      }
    );
  }
}
