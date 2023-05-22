import mongoose from "mongoose";

const { Schema } = mongoose;
const ReqBookSchema = new Schema({
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
  requestDate: {
    type: Date,
    required: true
  }
});

const ReqBook = mongoose.model("RequestedBooks", ReqBookSchema);

export default ReqBook;
