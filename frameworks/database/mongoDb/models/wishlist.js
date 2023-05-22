import mongoose from "mongoose";

const { Schema } = mongoose;
const WishlistSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;
