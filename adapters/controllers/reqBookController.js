import requestBook from "../../application/use_cases/requestedBook/requestBook.js";
import getAllReqBooks from "../../application/use_cases/requestedBook/getAllReqBooks.js";
import countAll from "../../application/use_cases/requestedBook/countAll.js";
import deleteReqBook from "../../application/use_cases/requestedBook/delete.js";
import getAllBookRequests from "../../application/use_cases/requestedBook/getAllBookRequests.js";

export default function reqBookController(dbRepository) {
  // request book
  const requestBookById = (req, res) => {
    const bookId = req.params.id;
    const memberId = req.user.id;
    requestBook(bookId, memberId, dbRepository)
      .then((book) => {
        res.status(200).json({ book });
      })
      .catch((err) => {
        res
          .status(err.statusCode || 500)
          .json({ message: err.message ? err.message : err });
      });
  };

  //   fetch requested Books
  const fetchAllReqByMember = (req, res) => {
    const memberId = req.user.id;
    const response = {};

    getAllReqBooks(memberId, dbRepository)
      .then((books) => {
        response.books = books;
        return countAll(dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const deleteReqBookById = (req, res) => {
    const { id } = req.params;
    deleteReqBook(id, dbRepository)
      .then(() => res.status(200).json({ id }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const fetchAllBookRequests = (req, res) => {
    const response = {};

    getAllBookRequests(dbRepository)
      .then((bookRequests) => {
        response.requests = bookRequests;
        return countAll(dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  return {
    requestBookById,
    fetchAllReqByMember,
    deleteReqBookById,
    fetchAllBookRequests
  };
}
