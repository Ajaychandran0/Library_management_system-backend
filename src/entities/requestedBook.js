export default function requestedBook(book) {
  return {
    getBook: () => book.book,
    getMember: () => book.member,
    getRequestedDate: () => book.requestedDate
  };
}
