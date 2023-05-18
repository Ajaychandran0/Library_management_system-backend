import categoryController from "../../../../adapters/controllers/categoryController.js";
import categoryDbRepository from "../../../../application/repositories/categoryDbRepository.js";
import categoryDbRepositoryMongoDB from "../../../database/mongoDb/repositories/categoryRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function categoryRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const dbRepository = categoryDbRepository(categoryDbRepositoryMongoDB());
  const controller = categoryController(dbRepository);

  router
    .route("/")
    .get(authMiddleware, controller.fetchAllCategories)
    .post(authMiddleware, controller.addNewCategory);
  router
    .route("/:id")
    .put(authMiddleware, controller.updateCategoryById)
    .delete(authMiddleware, controller.deleteCategoryById);

  return router;
}
