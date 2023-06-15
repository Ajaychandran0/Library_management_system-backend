import addBook from "../../application/use_cases/book/add.js";
import findByProperty from "../../application/use_cases/book/findByProperty.js";
import countAll from "../../application/use_cases/book/countAll.js";
import deleteBook from "../../application/use_cases/book/delete.js";
import updateBook from "../../application/use_cases/book/update.js";
import findByFilter from "../../application/use_cases/book/findByFilter.js";
import countAllByFilter from "../../application/use_cases/book/countAllByFilter.js";

export default function bookController({ bookRepository, cachingRepository }) {
  const addNewbook = (req, res) => {
    const bookDetails = req.body;
    addBook(bookDetails, bookRepository)
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
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;
    findByProperty(params, bookRepository)
      .then((books) => {
        response.books = books;
        return countAll(params, bookRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.pageSize);
        response.itemsPerPage = params.pageSize;
        const cachingOptions = {
          key: `books?page=${params.page}&pageSize=${params.pageSize}&category=${params.category}`,
          expireTimeSec: 360,
          data: JSON.stringify(response)
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        return res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };

  const deleteBookById = (req, res) => {
    const { id } = req.params;
    deleteBook(id, bookRepository)
      .then(() => {
        const cachingOptions = {
          key: "books?page=*&pageSize=$*&category=*",
          expireTimeSec: 1,
          data: ""
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        res.status(200).json({ id });
      })
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const updateBookById = (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;
    updateBook(id, updatedBook, bookRepository)
      .then(() => {
        cachingRepository.clearCache();
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const fetchBooksByFilter = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;
    findByFilter(params, bookRepository)
      .then((books) => {
        response.books = books;
        return countAllByFilter(params, bookRepository);
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

  return {
    addNewbook,
    fetchBooksByProperty,
    deleteBookById,
    updateBookById,
    fetchBooksByFilter
  };
}
