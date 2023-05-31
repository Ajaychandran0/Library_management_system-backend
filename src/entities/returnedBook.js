export default function returnedBook(book) {
  return {
    getBook: () => book.book,
    getMember: () => book.member,
    getIssuedDate: () => book.issueDate,
    getReturnDate: () => book.returnDate,
    getReturnedOn: () => book.returnedOn,
    getFine: () => book.fine,
    getIsFinePaid: () => book.isFinePaid
  };
}
