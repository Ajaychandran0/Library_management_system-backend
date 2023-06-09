import mongoose from "mongoose";

const { Schema } = mongoose;
const ReturnedBookSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Members",
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  returnedOn: {
    type: Date,
    required: true
  },
  fine: {
    type: Number
  },
  isFinePaid: {
    type: Boolean
  }
});

const ReturnedBook = mongoose.model("ReturnedBooks", ReturnedBookSchema);

export default ReturnedBook;
