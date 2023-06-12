import returnedBookController from "../../../../adapters/controllers/returnedBookController.js";
import returnedBookDbRepository from "../../../../application/repositories/returnedBookDbRepository.js";
import returnedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/returnedBookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function returnedBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const returnedBookRepository = returnedBookDbRepository(
    returnedBookDbRepositoryMongoDB()
  );
  const controller = returnedBookController({ returnedBookRepository });

  router.route("/").get(authMiddleware, controller.fetchReturnedBooksByMember);
  router
    .route("/filter")
    .get(authMiddleware, controller.fetchReturnedBooksByFilter);
  router
    .route("/overdueItems")
    .get(authMiddleware, controller.fetchMemberOverdueItems);

  return router;
}
