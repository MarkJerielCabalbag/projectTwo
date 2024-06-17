import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Please add Book title"],
      unique: true,
    },
    bookAuthor: {
      type: String,
      required: [true, "Please add book Author"],
    },
    bookPublishYear: {
      type: String,
      required: [true, "Please add year publish"],
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Book", bookSchema);
