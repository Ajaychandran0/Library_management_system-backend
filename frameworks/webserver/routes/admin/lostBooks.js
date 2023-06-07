import lostBookController from "../../../../adapters/controllers/lostBookController.js";
import lostBookDbRepository from "../../../../application/repositories/lostBookDbRepository.js";
import lostBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/lostBookRepositoryMongoDb.js";
import bookDbRepository from "../../../../application/repositories/bookDbRepository.js";
import bookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/bookRepositoryMongoDb.js";
import memberDbRepository from "../../../../application/repositories/memberDbRepository.js";
import memberDbRepositoryMongoDB from "../../../database/mongoDb/repositories/memberRepositoryMongoDb.js";
import issuedBookDbRepository from "../../../../application/repositories/issuedBookDbRepository.js";
import issuedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/issuedBookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function lostBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const lostBookRepository = lostBookDbRepository(
    lostBookDbRepositoryMongoDB()
  );
  const bookRepository = bookDbRepository(bookDbRepositoryMongoDB());
  const memberRepository = memberDbRepository(memberDbRepositoryMongoDB());
  const issuedBookRepository = issuedBookDbRepository(
    issuedBookDbRepositoryMongoDB()
  );
  const controller = lostBookController({
    lostBookRepository,
    bookRepository,
    memberRepository,
    issuedBookRepository
  });

  router
    .route("/")
    .get(authMiddleware, controller.fetchLostBooksByProperty)
    .post(authMiddleware, controller.addToLostBooks);

  return router;
}
