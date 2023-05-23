export default function wishlist(book) {
  return {
    getBook: () => book.book,
    getMember: () => book.member
  };
}
