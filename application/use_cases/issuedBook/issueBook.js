import issuedBook from "../../../src/entities/issuedBook.js";

export default function issuebook({
  bookId,
  memberId,
  bookRepository,
  issuedBookRepository,
  requestedBookRepository
}) {
  const issueDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 5);

  const newIssuedBook = issuedBook({
    book: bookId,
    member: memberId,
    issueDate,
    returnDate
  });

  return issuedBookRepository
    .findByProperty({ book: bookId, member: memberId })
    .then((book) => {
      if (book.length) {
        const error = {
          message: "Book already issued to the same student",
          statusCode: 400
        };
        throw error;
      }
      return bookRepository.findById(bookId);
    })
    .then((book) => {
      if (!book) {
        const error = {
          message: "Book does not exist",
          statusCode: 400
        };
        throw error;
      }
      if (book.availableQty <= 0) {
        const error = {
          message: "Book is not available",
          statusCode: 400
        };
        throw error;
      }
      book.availableQty -= 1;
      return book.save();
    })
    .then(() => requestedBookRepository.deleteByBookId(bookId))
    .then(() => issuedBookRepository.add(newIssuedBook));
}
