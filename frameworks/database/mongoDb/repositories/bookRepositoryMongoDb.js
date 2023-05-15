import BookModel from "../models/book.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function bookRepositoryMongoDB() {
  const findByProperty = (params) => BookModel.find(omit(params, "page", "pageSize"))
    .skip(params.pageSize * params.page)
    .limit(params.pageSize);

  const findByEmail = (email) => BookModel.findOne({ email }).select("password email");

  const countAll = (params) => BookModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => BookModel.findById(id);

  const add = (book) => {
    const newBook = new BookModel({
      bookTitle: book.getBookTitle(),
      ISBN: book.getISBN(),
      category: book.getCategory(),
      author: book.getAuthor(),
      language: book.getLanguage(),
      quantity: book.getQuantity(),
      availableQty: book.getAvailableQty(),
      price: book.getPrice(),
      lostPrice: book.getLostPrice(),
      section: book.getSection(),
      shelfNo: book.getShelfNo(),
      imageUrl: book.getImageUrl(),
      createdAt: book.getCreatedAt()
    });

    return newBook.save();
  };

  return {
    findByProperty,
    findByEmail,
    countAll,
    findById,
    add
  };
}
