import WishlistModel from "../models/wishlist.js";

export default function wishlistRepositoryMongoDB() {
  const getWishlist = (memberId) => WishlistModel.find({ member: memberId })
    .select("book -_id")
    .populate({
      path: "book",
      select: "author bookTitle availableQty imageUrl"
    })
    .sort({ _id: -1 })
    .exec()
    .then((book) => book.map((item) => item.book));

  const getWishlistIds = (memberId) => WishlistModel.find({ member: memberId })
    .select("book -_id")
    .then((book) => book.map((item) => item.book));

  const findByProperty = (params) => WishlistModel.find(params);

  const countAll = (params) => WishlistModel.countDocuments(params);

  const findById = (id) => WishlistModel.findById(id);

  const add = (book) => {
    const newWishBook = new WishlistModel({
      book: book.getBook(),
      member: book.getMember()
    });

    return newWishBook.save();
  };

  const deleteById = (id) => WishlistModel.deleteOne({ book: id });

  return {
    getWishlist,
    getWishlistIds,
    findByProperty,
    countAll,
    findById,
    add,
    deleteById
  };
}
