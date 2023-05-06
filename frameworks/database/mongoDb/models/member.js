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
  password: {
    type: String
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
    // required: true,
  },
  createdAt: {
    type: Date,
    required: true
  },
  address: {
    type: String
  }
});

const Member = mongoose.model("members", MemberSchema);

export default Member;
