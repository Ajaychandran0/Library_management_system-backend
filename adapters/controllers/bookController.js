import addBook from "../../application/use_cases/book/add.js";
import findByProperty from "../../application/use_cases/book/findByProperty.js";
import countAll from "../../application/use_cases/book/countAll.js";

export default function bookController(dbRepository) {
  const addNewbook = (req, res) => {
    const bookDetails = req.body;

    addBook(bookDetails, dbRepository)
      .then((book) => {
        res.status(200).json({ book });
      })

      .catch((err) => {
        res
          .status(err.statusCode || 500)
          .json({ message: err.message ? err.message : err });
      });
  };

  const fetchBooksByProperty = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;

    findByProperty(params, dbRepository)
      .then((books) => {
        response.books = books;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.pageSize);
        response.itemsPerPage = params.pageSize;
        return res.json(response);
      })
      .catch((error) => res.status(500).json({ message: error }));
  };

  return {
    addNewbook,
    fetchBooksByProperty
  };
}
