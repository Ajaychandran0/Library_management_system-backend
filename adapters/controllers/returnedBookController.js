import returnBook from "../../application/use_cases/returnedBook/returnBook.js";
import countAll from "../../application/use_cases/returnedBook/countAll.js";
import findByMember from "../../application/use_cases/returnedBook/findByMember.js";

export default function issuedBookController({
  returnedBookRepository,
  issuedBookRepository,
  bookRepository
}) {
  // issue book
  const returnNewBook = (req, res) => {
    const { bookId, memberId } = req.body;
    returnBook({
      bookId,
      memberId,
      bookRepository,
      returnedBookRepository,
      issuedBookRepository
    })
      .then((book) => {
        res.status(200).json({ book });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(err.statusCode || 500)
          .json({ message: err.message ? err.message : err });
      });
  };

  const fetchReturnedBooksByMember = (req, res) => {
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

    findByMember(params, returnedBookRepository)
      .then((returnedBooks) => {
        response.returnedBooks = returnedBooks;
        return countAll(params, returnedBookRepository);
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
    returnNewBook,
    fetchReturnedBooksByMember
  };
}
