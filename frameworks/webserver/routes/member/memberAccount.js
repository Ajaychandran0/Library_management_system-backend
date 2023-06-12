import memberController from "../../../../adapters/controllers/memberController.js";
import memberDbRepository from "../../../../application/repositories/memberDbRepository.js";
import memberDbRepositoryMongoDB from "../../../database/mongoDb/repositories/memberRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function returnedBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const memberRepository = memberDbRepository(memberDbRepositoryMongoDB());
  const controller = memberController(memberRepository);

  router.route("/").get(authMiddleware, controller.fetchMemberById);

  return router;
}
