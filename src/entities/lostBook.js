export default function lostBook(book) {
  return {
    getBook: () => book.book,
    getMember: () => book.member,
    getLostDate: () => book.lostDate,
    getLostQty: () => book.lostQty,
    getIsFinePaid: () => book.isFinePaid
  };
}
