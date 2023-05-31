import issuedBookController from "../../../../adapters/controllers/issuedBookController.js";
import issuedBookDbRepository from "../../../../application/repositories/issuedBookDbRepository.js";
import issuedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/issuedBookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function issuedBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const issuedBookRepository = issuedBookDbRepository(issuedBookDbRepositoryMongoDB());
  const controller = issuedBookController({ issuedBookRepository });

  router
    .route("/")
    .get(authMiddleware, controller.fetchIssuedBooksByMember);

  return router;
}
