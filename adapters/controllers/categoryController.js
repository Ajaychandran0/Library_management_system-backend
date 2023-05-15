import addCategory from "../../application/use_cases/category/add.js";
import findAllCategories from "../../application/use_cases/category/fetchAll.js";
import countAll from "../../application/use_cases/category/countAll.js";
import deleteCategory from "../../application/use_cases/category/delete.js";

export default function categoryController(dbRepository) {
  const addNewCategory = (req, res) => {
    const categoryDetails = req.body;

    addCategory(categoryDetails, dbRepository)
      .then((category) => res.status(200).json({ category }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const fetchAllCategories = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;

    findAllCategories(params, dbRepository)
      .then((categories) => {
        response.categories = categories;
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

  const deleteCategoryById = (req, res) => {
    const { id } = req.body;
    deleteCategory(id)
      .then(() => res.status(200))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  return {
    addNewCategory,
    fetchAllCategories,
    deleteCategoryById
  };
}
