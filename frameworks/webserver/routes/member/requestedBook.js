import reqBookController from "../../../../adapters/controllers/reqBookController.js";
import reqBookDbRepository from "../../../../application/repositories/reqBookDbRepository.js";
import reqBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/reqBookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function reqBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const dbRepository = reqBookDbRepository(reqBookDbRepositoryMongoDB());
  const controller = reqBookController(dbRepository);

  router.route("/").get(authMiddleware, controller.fetchAllReqBooks);

  router
    .route("/:id")
    .post(authMiddleware, controller.requestBookById)
    .delete(authMiddleware, controller.deleteReqBookById);

  return router;
}
