import mongoose from "mongoose";

const { Schema } = mongoose;

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  collegeId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  collegeIdCard: {
    type: String
  },
  enrolledOn: {
    type: Date,
    required: true
  },
  address: {
    type: String
  }
});

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
    required: true,
    uppercase: true
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
  bookCoverUrl: {
    type: String
  },
  addedOn: {
    type: Date,
    required: true
  }
});

const LostBookSchema = new Schema({
  member: {
    type: MemberSchema
  },
  book: {
    type: BookSchema,
    required: true
  },
  lostQty: {
    type: Number,
    required: true
  },
  lostDate: {
    type: Date,
    required: true
  },
  isFinePaid: {
    type: Boolean
  }
});

const LostBook = mongoose.model("LostBooks", LostBookSchema);

export default LostBook;
