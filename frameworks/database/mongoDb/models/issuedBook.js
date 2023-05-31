import mongoose from "mongoose";

const { Schema } = mongoose;
const IssuedBookSchema = new Schema({
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
  }

});

const IssuedBook = mongoose.model("IssuedBooks", IssuedBookSchema);

export default IssuedBook;
