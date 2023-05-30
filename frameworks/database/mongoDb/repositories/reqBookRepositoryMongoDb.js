import ReqBookModel from "../models/requestedBook.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function reqBookRepositoryMongoDB() {
  const getAllReqBooks = (memberId) => ReqBookModel.find({ member: memberId })
    .select("book -_id")
    .populate({
      path: "book",
      select: "author bookTitle availableQty imageUrl"
    })
    .sort({ requestDate: -1 })
    .exec()
    .then((book) => book.map((item) => item.book));

  const countAll = (params) => ReqBookModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => ReqBookModel.findById(id);

  const findByProperty = (params) => ReqBookModel.find(params);

  const add = (book) => {
    const newReqBook = new ReqBookModel({
      book: book.getBook(),
      member: book.getMember(),
      requestDate: book.getRequestedDate()
    });

    return newReqBook.save();
  };

  const deleteByBookId = (id) => ReqBookModel.deleteOne({ book: id });

  const getAllBookRequests = (params) => ReqBookModel.aggregate([
    { $match: omit(params, "page", "pageSize") },
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "bookData"
      }
    },
    { $unwind: "$bookData" },
    {
      $lookup: {
        from: "members",
        localField: "member",
        foreignField: "_id",
        as: "memberData"
      }
    },
    { $unwind: "$memberData" },
    {
      $project: {
        ISBN: "$bookData.ISBN",
        bookTitle: "$bookData.bookTitle",
        availableQty: "$bookData.availableQty",
        bookId: "$bookData._id",
        memberId: "$memberData._id",
        name: "$memberData.name",
        email: "$memberData.email",
        collegeId: "$memberData.collegeId",
        requestDate: 1
      }
    },
    { $sort: { requestDate: -1 } },
    { $skip: params.pageSize * params.page },
    { $limit: params.pageSize }
  ]);

  return {
    getAllReqBooks,
    findByProperty,
    countAll,
    findById,
    add,
    deleteByBookId,
    getAllBookRequests
  };
}
