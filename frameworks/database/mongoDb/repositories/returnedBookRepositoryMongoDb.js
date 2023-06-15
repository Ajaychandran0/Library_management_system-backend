import mongoose from "mongoose";
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
    .sort({ issueDate: -1 })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize)
    .exec();

  const findByMember = (params) => ReturnedBookModel.find(omit(params, "page", "pageSize"))
    .populate({
      path: "book",
      select: "ISBN bookTitle imageUrl language author"
    })
    .sort({ returnedOn: -1 })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize)
    .exec();

  const findByFilter = (memberId, params) => {
    const { filter } = omit(params, "page", "pageSize");
    const searchQuery = {
      $or: [
        { "book.bookTitle": { $regex: filter, $options: "i" } },
        { "book.ISBN": { $regex: filter, $options: "i" } },
        { "book.author": { $regex: filter, $options: "i" } },
        { "book.category": { $regex: filter, $options: "i" } }
      ]
    };
    return ReturnedBookModel.aggregate([
      { $match: { member: new mongoose.Types.ObjectId(memberId) } },
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      { $match: searchQuery },
      {
        $facet: {
          totalCount: [{ $count: "total" }],
          results: [
            { $sort: { returnedOn: -1 } },
            { $skip: params.pageSize * params.page },
            { $limit: params.pageSize }
          ]
        }
      }
    ]).exec();
  };

  const findByOverdueItems = (memberId) => ReturnedBookModel.find({
    member: memberId,
    fine: { $gt: 0 },
    isFinePaid: false
  })
    .populate({
      path: "book",
      select: "ISBN bookTitle imageUrl language author"
    })
    .sort({ returnedOn: -1 });

  const findAllOverdueItems = () => ReturnedBookModel.find({
    fine: { $gt: 0 },
    isFinePaid: false
  })
    .populate({
      path: "book",
      select: "ISBN bookTitle imageUrl language author"
    })
    .populate({
      path: "member",
      select: "name email collegeId"
    })
    .sort({ returnedOn: -1 });

  const updateById = (id, updatedItem) => ReturnedBookModel.updateOne({ _id: id }, updatedItem);

  return {
    findByMember,
    findByProperty,
    countAll,
    findById,
    add,
    findByFilter,
    findByOverdueItems,
    findAllOverdueItems,
    updateById
  };
}
