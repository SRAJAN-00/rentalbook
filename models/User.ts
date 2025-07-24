import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Will be validated in the application logic
  },
  googleId: {
    type: String,
    sparse: true, // Allows null values but ensures uniqueness when present
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  preferences: {
    favoriteGenres: [String],
    location: String,
  },
  rentalHistory: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      rentDate: Date,
      returnDate: Date,
      actualReturnDate: Date,
      status: {
        type: String,
        enum: ["active", "returned", "overdue"],
        default: "active",
      },
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
