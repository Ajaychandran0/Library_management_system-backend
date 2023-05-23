import wishlist from "../../../src/entities/wishlist.js";

export default function addToWishlist(bookId, memberId, wishlistRepository) {
  const newWishBook = wishlist({
    book: bookId,
    member: memberId
  });

  return wishlistRepository
    .findByProperty({ book: bookId })
    .then((bookExist) => {
      if (bookExist.length) {
        const error = {
          message: "This book is already in your wishlist",
          statusCode: 400
        };
        throw error;
      }
      return wishlistRepository.add(newWishBook);
    });
}
