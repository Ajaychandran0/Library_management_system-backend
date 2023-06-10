import lostBookController from "../../../../adapters/controllers/lostBookController.js";
import lostBookDbRepository from "../../../../application/repositories/lostBookDbRepository.js";
import lostBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/lostBookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function lostBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const lostBookRepository = lostBookDbRepository(lostBookDbRepositoryMongoDB());
  const controller = lostBookController({ lostBookRepository });

  router
    .route("/")
    .get(authMiddleware, controller.fetchLostBooksByMember);

  return router;
}
