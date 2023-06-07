import IssuedBookModel from "../models/issuedBook.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function issuedBookRepositoryMongoDB() {
  const find = (params) => IssuedBookModel.find(params);
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

  const deleteByProperty = (params) => IssuedBookModel.deleteOne(params);

  const findByProperty = (params) => IssuedBookModel.find(omit(params, "page", "pageSize"))
    .populate({
      path: "book",
      select: "ISBN bookTitle availableQty"
    })
    .populate({
      path: "member",
      select: "name email collegeId"
    })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize)
    .sort({ issueDate: -1 })

    .exec();

  const findByMember = (params) => IssuedBookModel.find(omit(params, "page", "pageSize"))
    .populate({
      path: "book",
      select: "ISBN bookTitle imageUrl language author -_id"
    })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize)
    .sort({ issueDate: -1 })
    .exec();

  return {
    find,
    findByMember,
    findByProperty,
    countAll,
    findById,
    add,
    deleteByProperty
  };
}
