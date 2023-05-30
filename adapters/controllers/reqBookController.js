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
    const params = {};

    getAllReqBooks(memberId, dbRepository)
      .then((books) => {
        response.books = books;
        return countAll(params, dbRepository);
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
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;

    getAllBookRequests(params, dbRepository)
      .then((bookRequests) => {
        response.requests = bookRequests;
        return countAll(params, dbRepository);
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
