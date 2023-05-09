import book from "../../../src/entities/book.js";

export default function addbook(bookDetails, bookRepository) {
  const {
    bookTitle,
    ISBN,
    category,
    author,
    language,
    quantity,
    price,
    lostPrice,
    section,
    shelfNo,
    image
  } = bookDetails;

  const createdAt = new Date();
  const availableQty = quantity;

  if (!bookTitle || !ISBN || !language || !quantity || !image) {
    const error = { message: "Input fields cannot be empty", statusCode: 400 };
    throw error;
  }

  const newbook = book({
    bookTitle,
    ISBN,
    category,
    author,
    language,
    quantity: Number(quantity),
    availableQty: Number(availableQty),
    price: Number(price),
    lostPrice: Number(lostPrice),
    section,
    shelfNo: Number(shelfNo),
    imageUrl: image,
    createdAt
  });

  return bookRepository.findByProperty({ ISBN }).then((bookExist) => {
    if (bookExist.length) {
      const error = {
        message: `Book with ISBN: ${ISBN} already exists`,
        statusCode: 500
      };
      throw error;
    }
    return bookRepository.add(newbook);
  });
}
