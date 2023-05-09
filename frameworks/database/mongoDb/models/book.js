import mongoose from "mongoose";

const { Schema } = mongoose;
const BookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  availableQty: {
    type: Number,
    required: true
  },
  author: {
    type: String
  },
  price: {
    type: Number
  },
  lostPrice: {
    type: String
  },
  section: {
    type: String
  },
  shelfNo: {
    type: Number
  },
  comments: {
    type: String
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true
  }
});

const Book = mongoose.model("Books", BookSchema);

export default Book;
