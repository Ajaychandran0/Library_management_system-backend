import authController from "../../../../adapters/controllers/authController.js";
import adminDbRepository from "../../../../application/repositories/adminDbRepository.js";
import adminDbRepositoryMongoDB from "../../../database/mongoDb/repositories/adminRepositoryMongoDb.js";
import authServiceInterface from "../../../../application/services/authService.js";
import authServiceImpl from "../../../services/authService.js";
import addRole from "../../middlewares/addRole.js";

export default function authRouter(express) {
  const router = express.Router();

  const dbRepository = adminDbRepository(adminDbRepositoryMongoDB());
  const authService = authServiceInterface(authServiceImpl());
  const controller = authController(dbRepository, authService);

  router.route("/").post(addRole, controller.doLogin);

  return router;
}
