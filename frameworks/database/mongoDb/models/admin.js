import mongoose from "mongoose";

const { Schema } = mongoose;
const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admin", AdminSchema);

export default Admin;
