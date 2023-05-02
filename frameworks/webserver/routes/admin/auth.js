import authController from "../../../../adapters/controllers/authController.js";
import adminDbRepository from "../../../../application/repositories/adminDbRepository.js";
import adminDbRepositoryMongoDB from "../../../database/mongoDb/repositories/adminRepositoryMongoDb.js";
import authServiceInterface from "../../../../application/services/authService.js";
import authServiceImpl from "../../../services/authService.js";

export default function authRouter(express) {
  const router = express.Router();

  const controller = authController(
    adminDbRepository,
    adminDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  router.route("/").post(controller.doLogin);

  return router;
}
