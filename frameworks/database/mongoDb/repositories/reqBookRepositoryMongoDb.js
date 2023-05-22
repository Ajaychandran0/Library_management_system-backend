import ReqBookModel from "../models/requestedBook.js";

export default function bookRepositoryMongoDB() {
  const getAllReqBooks = (memberId) => ReqBookModel.find({ member: memberId })
    .select("book -_id")
    .populate({
      path: "book",
      select: "author bookTitle availableQty imageUrl"
    })
    .sort({ requestDate: -1 })
    .exec();

  const findByProperty = (params) => ReqBookModel.find(params);

  const countAll = (params) => ReqBookModel.countDocuments(params);

  const findById = (id) => ReqBookModel.findById(id);

  const add = (book) => {
    const newReqBook = new ReqBookModel({
      book: book.getBook(),
      member: book.getMember(),
      requestDate: book.getRequestedDate()
    });

    return newReqBook.save();
  };

  const deleteById = (id) => ReqBookModel.deleteOne({ book: id });

  return {
    getAllReqBooks,
    findByProperty,
    countAll,
    findById,
    add,
    deleteById
  };
}
