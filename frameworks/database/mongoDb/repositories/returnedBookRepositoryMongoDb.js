import ReturnedBookModel from "../models/returnedBook.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function returnedBookRepositoryMongoDB() {
  const countAll = (params) => ReturnedBookModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => ReturnedBookModel.findById(id);

  const add = (book) => {
    const newReturnedBook = new ReturnedBookModel({
      book: book.getBook(),
      member: book.getMember(),
      issueDate: book.getIssuedDate(),
      returnDate: book.getReturnDate(),
      returnedOn: book.getReturnedOn(),
      fine: book.getFine(),
      isFinePaid: book.getIsFinePaid()
    });

    return newReturnedBook.save();
  };

  const findByProperty = (params) => ReturnedBookModel.find(omit(params, "page", "pageSize"))
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

  const findByMember = (params) => ReturnedBookModel.find(omit(params, "page", "pageSize"))
    .populate({
      path: "book",
      select: "ISBN bookTitle imageUrl language author -_id"
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
    add
  };
}
