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
    .route("/", authMiddleware)
    .get(controller.fetchAllCategories)
    .post(controller.addNewCategory);

  return router;
}
