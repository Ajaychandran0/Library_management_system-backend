export default function issuedBook(book) {
  return {
    getBook: () => book.book,
    getMember: () => book.member,
    getIssuedDate: () => book.issueDate,
    getReturnDate: () => book.returnDate
  };
}
