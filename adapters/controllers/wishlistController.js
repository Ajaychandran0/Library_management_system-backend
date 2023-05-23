import addToWishlist from "../../application/use_cases/wishlist/addToWishlist.js";
import getWishlist, {
  getWishlistIds
} from "../../application/use_cases/wishlist/getWishlist.js";
import countAll from "../../application/use_cases/wishlist/countAll.js";
import removeFromWishlist from "../../application/use_cases/wishlist/delete.js";

export default function wishlistController(dbRepository) {
  // add to wishlist
  const addToWishlistById = (req, res) => {
    const bookId = req.params.id;
    const memberId = req.user.id;
    addToWishlist(bookId, memberId, dbRepository)
      .then((book) => {
        res.status(200).json({ id: book.book });
      })
      .catch((err) => {
        res
          .status(err.statusCode || 500)
          .json({ message: err.message ? err.message : err });
      });
  };

  // get all wishlost item ids
  const fetchWishlistIds = (req, res) => {
    const memberId = req.user.id;
    getWishlistIds(memberId, dbRepository).then((bookIds) => {
      res.status(200).json(bookIds);
    });
  };

  //   fetch wishlist
  const fetchWishlist = (req, res) => {
    const memberId = req.user.id;
    const response = {};

    getWishlist(memberId, dbRepository)
      .then((books) => {
        response.books = books;
        return countAll(dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        return res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const removeFromWishlistById = (req, res) => {
    const { id } = req.params;
    removeFromWishlist(id, dbRepository)
      .then(() => res.status(200).json({ id }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  return {
    addToWishlistById,
    fetchWishlistIds,
    fetchWishlist,
    removeFromWishlistById
  };
}
