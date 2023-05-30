import issuedBookController from "../../../../adapters/controllers/issuedBookController.js";
import issuedBookDbRepository from "../../../../application/repositories/issuedBookDbRepository.js";
import issuedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/issuedBookRepositoryMongoDb.js";
import reqBookDbRepository from "../../../../application/repositories/reqBookDbRepository.js";
import reqBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/reqBookRepositoryMongoDb.js";
import bookDbRepository from "../../../../application/repositories/bookDbRepository.js";
import bookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/bookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function issuedBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const issuedBookRepository = issuedBookDbRepository(
    issuedBookDbRepositoryMongoDB()
  );
  const requestedBookRepository = reqBookDbRepository(
    reqBookDbRepositoryMongoDB()
  );
  const bookRepository = bookDbRepository(bookDbRepositoryMongoDB());

  const controller = issuedBookController({
    issuedBookRepository,
    requestedBookRepository,
    bookRepository
  });

  router
    .route("/")
    .get(authMiddleware, controller.fetchIssuedBooksByProperty)
    .post(authMiddleware, controller.issueNewBook);

  return router;
}
