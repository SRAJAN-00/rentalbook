import mongoose, { Schema, Document } from "mongoose";
export interface IFav extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favSchema = new Schema<IFav>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book ID is required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Fav = mongoose.model<IFav>("Fav", favSchema);

export default Fav;
