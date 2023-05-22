import mongoose from "mongoose";

const { Schema } = mongoose;
const LostBookSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId
  },
  lostDate: {
    type: Date,
    required: true
  },
  fineStatus: {
    type: Boolean
  }
});

const LostBook = mongoose.model("LostBooks", LostBookSchema);

export default LostBook;
