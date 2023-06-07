import LostBookModel from "../models/lostBook.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function lostBookRepositoryMongoDB() {
  const countAll = (params) => LostBookModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => LostBookModel.findById(id);

  const add = (book) => {
    const newLostBook = new LostBookModel({
      book: book.getBook(),
      member: book.getMember(),
      lostQty: book.getLostQty(),
      lostDate: book.getLostDate(),
      isFinePaid: book.getIsFinePaid()
    });

    return newLostBook.save();
  };

  const deleteByProperty = (params) => LostBookModel.deleteOne(params);

  const findByProperty = (params) => LostBookModel.find(omit(params, "page", "pageSize"))
    .sort({ lostDate: -1 })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize)
    .exec();

  const updateLostQty = (bookId, qty) => LostBookModel
    .updateOne({ "book._id": bookId }, { $inc: { lostQty: qty } });

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteByProperty,
    updateLostQty
  };
}
