import addLostBook from "../../application/use_cases/lostBook/add.js";
import findByProperty from "../../application/use_cases/lostBook/findByProperty.js";
import countAll from "../../application/use_cases/lostBook/countAll.js";

export default function lostBookController({
  lostBookRepository,
  bookRepository,
  memberRepository,
  issuedBookRepository
}) {
  // add to lost books collection
  const addToLostBooks = (req, res) => {
    const { bookId, memberId } = req.body;
    addLostBook({
      bookId,
      memberId,
      bookRepository,
      memberRepository,
      issuedBookRepository,
      lostBookRepository
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

  const fetchLostBooksByProperty = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;

    findByProperty(params, lostBookRepository)
      .then((lostBooks) => {
        response.lostBooks = lostBooks;
        return countAll(params, lostBookRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const fetchLostBooksByMember = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;
    params["member._id"] = req.user.id;

    findByProperty(params, lostBookRepository)
      .then((lostBooks) => {
        response.lostBooks = lostBooks;
        return countAll(params, lostBookRepository);
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
    addToLostBooks,
    fetchLostBooksByProperty,
    fetchLostBooksByMember
  };
}
