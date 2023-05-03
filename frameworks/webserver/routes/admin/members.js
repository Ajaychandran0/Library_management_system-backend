import memberController from "../../../../adapters/controllers/memberController.js";
import memberDbRepository from "../../../../application/repositories/memberDbRepository.js";
import memberDbRepositoryMongoDB from "../../../database/mongoDb/repositories/memberRepositoryMongoDb.js";
import authServiceInterface from "../../../../application/services/authService.js";
import authServiceImpl from "../../../services/authService.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function memberRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = memberController(
    memberDbRepository,
    memberDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  router.route("/")
    .get(controller.fetchMembersByProperty)
    .post(controller.addNewMember);

  return router;
}
