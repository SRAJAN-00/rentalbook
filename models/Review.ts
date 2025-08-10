import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create compound index to ensure one review per user per book
ReviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

// Update the updatedAt field before saving
ReviewSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
