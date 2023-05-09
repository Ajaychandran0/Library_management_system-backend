import bookController from "../../../../adapters/controllers/bookController.js";
import bookDbRepository from "../../../../application/repositories/bookDbRepository.js";
import bookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/bookRepositoryMongoDb.js";

export default function bookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const dbRepository = bookDbRepository(bookDbRepositoryMongoDB());
  const controller = bookController(dbRepository);

  router
    .route("/")
    .get(controller.fetchBooksByProperty);

  return router;
}
