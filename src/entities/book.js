export default function Book(book) {
  return {
    getBookTitle: () => book.bookTitle,
    getISBN: () => book.ISBN,
    getCategory: () => book.category,
    getAuthor: () => book.author,
    getLanguage: () => book.language,
    getQuantity: () => book.quantity,
    getAvailableQty: () => book.availableQty,
    getPrice: () => book.price,
    getLostPrice: () => book.lostPrice,
    getSection: () => book.section,
    getShelfNo: () => book.shelfNo,
    getImageUrl: () => book.imageUrl,
    getCreatedAt: () => book.createdAt,
    getAboutBook: () => book.aboutBook
  };
}
