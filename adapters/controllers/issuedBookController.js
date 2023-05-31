import issueBook from "../../application/use_cases/issuedBook/issueBook.js";
import findByProperty from "../../application/use_cases/issuedBook/findByProperty.js";
import countAll from "../../application/use_cases/issuedBook/countAll.js";
import findByMember from "../../application/use_cases/issuedBook/findByMember.js";

export default function issuedBookController({
  issuedBookRepository,
  requestedBookRepository,
  bookRepository
}) {
  // issue book
  const issueNewBook = (req, res) => {
    const { bookId, memberId } = req.body;
    issueBook({
      bookId,
      memberId,
      bookRepository,
      requestedBookRepository,
      issuedBookRepository
    })
      .then((book) => {
        res.status(200).json({ book });
      })
      .catch((err) => {
        res
          .status(err.statusCode || 500)
          .json({ message: err.message ? err.message : err });
      });
  };

  const fetchIssuedBooksByProperty = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;

    findByProperty(params, issuedBookRepository)
      .then((issuedBooks) => {
        response.issuedBooks = issuedBooks;
        return countAll(params, issuedBookRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const fetchIssuedBooksByMember = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;
    params.member = req.user.id;

    findByMember(params, issuedBookRepository)
      .then((borrowedBooks) => {
        response.borrowedBooks = borrowedBooks;
        return countAll(params, issuedBookRepository);
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
    issueNewBook,
    fetchIssuedBooksByProperty,
    fetchIssuedBooksByMember
  };
}
