import returnedBook from "../../../src/entities/returnedBook.js";

export default function issuebook({
  bookId,
  memberId,
  bookRepository,
  issuedBookRepository,
  returnedBookRepository
}) {
  return issuedBookRepository
    .find({ book: bookId, member: memberId })
    .then((issuedBook) => {
      if (!issuedBook[0]) {
        const error = {
          message: "Issued-Book does not exist",
          statusCode: 400
        };
        throw error;
      }
      const returnedOn = new Date();

      const returnBook = {
        book: issuedBook[0].book,
        member: issuedBook[0].member,
        issueDate: issuedBook[0].issueDate,
        returnDate: issuedBook[0].returnDate,
        returnedOn
      };

      const timeDiff = returnedOn.getTime() - issuedBook[0].returnDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff > 0) {
        returnBook.fine = daysDiff * 10;
      } else {
        returnBook.fine = 0;
      }
      returnBook.isFinePaid = false;

      const newReturnedBook = returnedBook(returnBook);

      return returnedBookRepository.add(newReturnedBook);
    })
    .then(() => bookRepository.updateNetQty(bookId, 1))
    .then(() => issuedBookRepository.deleteByProperty({ book: bookId, member: memberId }));
}
