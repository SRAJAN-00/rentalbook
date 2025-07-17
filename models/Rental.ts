import mongoose, { Schema, Document } from "mongoose";

export interface IRental extends Document {
  bookId: mongoose.Types.ObjectId;
  renterName: string;
  renterEmail: string;
  rentDate: Date;
  returnDate?: Date;
  dueDate: Date;
  status: "active" | "returned" | "overdue";
  createdAt: Date;
  updatedAt: Date;
}

const RentalSchema = new Schema<IRental>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    renterName: {
      type: String,
      required: [true, "Renter name is required"],
      trim: true,
    },
    renterEmail: {
      type: String,
      required: [true, "Renter email is required"],
      trim: true,
      lowercase: true,
    },
    rentDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    status: {
      type: String,
      enum: ["active", "returned", "overdue"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rental ||
  mongoose.model<IRental>("Rental", RentalSchema);
