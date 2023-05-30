import IssuedBookModel from "../models/issuedBook.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function issuedBookRepositoryMongoDB() {
  const findByMember = (memberId) => IssuedBookModel.find(memberId)
    .select("book -_id")
    .populate({
      path: "book",
      select: "author bookTitle availableQty imageUrl"
    })
    .sort({ issueDate: -1 })
    .exec()
    .then((book) => book.map((item) => item.book));

  const countAll = (params) => IssuedBookModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => IssuedBookModel.findById(id);

  const add = (book) => {
    const newReqBook = new IssuedBookModel({
      book: book.getBook(),
      member: book.getMember(),
      issueDate: book.getIssuedDate(),
      returnDate: book.getReturnDate()
    });

    return newReqBook.save();
  };

  const deleteByBookId = (id) => IssuedBookModel.deleteOne({ book: id });

  const findByProperty = (params) => IssuedBookModel.find(omit(params, "page", "pageSize"))
    .populate({
      path: "book",
      select: "ISBN bookTitle availableQty -_id"
    })
    .populate({
      path: "member",
      select: "name email collegeId -_id"
    })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize)
    .sort({ issueDate: -1 })

    .exec();

  return {
    findByMember,
    findByProperty,
    countAll,
    findById,
    add,
    deleteByBookId
  };
}
