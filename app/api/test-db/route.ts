import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
