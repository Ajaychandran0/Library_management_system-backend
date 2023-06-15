import returnBook from "../../application/use_cases/returnedBook/returnBook.js";
import countAll from "../../application/use_cases/returnedBook/countAll.js";
import findByMember from "../../application/use_cases/returnedBook/findByMember.js";
import findByFilter from "../../application/use_cases/returnedBook/findByFilter.js";
import findbyOverdueItems from "../../application/use_cases/returnedBook/findByOverdueItems.js";
import findAllOverdueItems from "../../application/use_cases/returnedBook/findAllOverdueItems.js";

export default function returnedBookController({
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
        response.totalPages = Math.ceil(totalItems / params.pageSize);
        response.itemsPerPage = params.pageSize;
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const fetchReturnedBooksByFilter = (req, res) => {
    const params = {};
    const response = {};
    const memberId = req.user.id;

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;
    findByFilter(memberId, params, returnedBookRepository)
      .then((books) => {
        response.returnedBooks = books[0].results;
        const totalItems = books[0].totalCount[0].total;
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.pageSize);
        response.itemsPerPage = params.pageSize;
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const fetchMemberOverdueItems = (req, res) => {
    const memberId = req.user.id;
    findbyOverdueItems(memberId, returnedBookRepository)
      .then((overdueItems) => res.json({ overdueItems }))
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const fetchAllOverdueItems = (req, res) => {
    findAllOverdueItems(returnedBookRepository)
      .then((overdueItems) => res.json({ overdueItems }))
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  return {
    returnNewBook,
    fetchReturnedBooksByMember,
    fetchReturnedBooksByFilter,
    fetchMemberOverdueItems,
    fetchAllOverdueItems
  };
}
