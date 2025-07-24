import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    console.log("Registration request received");

    const body = await request.json();
    console.log("Request body parsed:", { ...body, password: "[HIDDEN]" });

    const { name, email, password } = body;

    if (!name || !email || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("Password too short");
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connected successfully");

    // Check if user already exists
    console.log("Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed successfully");

    // Create user
    console.log("Creating user...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      preferences: {
        favoriteGenres: [],
        location: "",
      },
      rentalHistory: [],
      wishlist: [],
    });
    console.log("User created successfully with ID:", user._id);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });
    return NextResponse.json(
      { error: "Internal server error - check server logs" },
      { status: 500 }
    );
  }
}
