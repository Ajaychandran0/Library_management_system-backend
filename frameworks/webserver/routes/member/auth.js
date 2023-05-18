import authController from "../../../../adapters/controllers/authController.js";
import memberDbRepository from "../../../../application/repositories/memberDbRepository.js";
import memberDbRepositoryMongoDB from "../../../database/mongoDb/repositories/memberRepositoryMongoDb.js";
import authServiceInterface from "../../../../application/services/authService.js";
import authServiceImpl from "../../../services/authService.js";

export default function authRouter(express) {
  const router = express.Router();

  const dbRepository = memberDbRepository(memberDbRepositoryMongoDB());
  const authService = authServiceInterface(authServiceImpl());
  const controller = authController(dbRepository, authService);

  router.route("/").post(controller.doLogin);

  return router;
}
