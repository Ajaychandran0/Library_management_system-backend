import returnedBookController from "../../../../adapters/controllers/returnedBookController.js";
import returnedBookDbRepository from "../../../../application/repositories/returnedBookDbRepository.js";
import returnedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/returnedBookRepositoryMongoDb.js";
import issuedBookDbRepository from "../../../../application/repositories/issuedBookDbRepository.js";
import issuedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/issuedBookRepositoryMongoDb.js";
import bookDbRepository from "../../../../application/repositories/bookDbRepository.js";
import bookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/bookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function issuedBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const returnedBookRepository = returnedBookDbRepository(
    returnedBookDbRepositoryMongoDB()
  );
  const issuedBookRepository = issuedBookDbRepository(
    issuedBookDbRepositoryMongoDB()
  );
  const bookRepository = bookDbRepository(bookDbRepositoryMongoDB());

  const controller = returnedBookController({
    returnedBookRepository,
    issuedBookRepository,
    bookRepository
  });

  router
    .route("/")
    .get(authMiddleware, controller.fetchReturnedBooksByMember)
    .post(authMiddleware, controller.returnNewBook);

  router
    .route("/overdueItems")
    .get(authMiddleware, controller.fetchAllOverdueItems);

  return router;
}
