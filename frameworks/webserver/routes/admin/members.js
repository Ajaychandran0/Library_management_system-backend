import memberController from "../../../../adapters/controllers/memberController.js";
import memberDbRepository from "../../../../application/repositories/memberDbRepository.js";
import memberDbRepositoryMongoDB from "../../../database/mongoDb/repositories/memberRepositoryMongoDb.js";
import authServiceInterface from "../../../../application/services/authService.js";
import authServiceImpl from "../../../services/authService.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function memberRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const dbRepository = memberDbRepository(memberDbRepositoryMongoDB());
  const authService = authServiceInterface(authServiceImpl());

  const controller = memberController(dbRepository, authService);

  router
    .route("/")
    .get(authMiddleware, controller.fetchMembersByProperty)
    .post(authMiddleware, controller.addNewMember);

  return router;
}
