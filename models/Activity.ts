import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  action: "rented" | "returned" | "favorited" | "unfavorited" | "viewed";
  bookId: mongoose.Types.ObjectId;
  bookTitle: string;
  bookAuthor: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    action: {
      type: String,
      enum: ["rented", "returned", "favorited", "unfavorited", "viewed"],
      required: [true, "Action is required"],
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
    },
    bookAuthor: {
      type: String,
      required: [true, "Book author is required"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
ActivitySchema.index({ userId: 1, timestamp: -1 });

export default mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);
