import mongoose from "mongoose";

const { Schema } = mongoose;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true
  },

  description: {
    type: String
  },

  imageUrl: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    required: true
  },

  updatedAt: {
    type: Date
  }
});

const Category = mongoose.model("Categories", CategorySchema);

export default Category;
