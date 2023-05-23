import wishlistController from "../../../../adapters/controllers/wishlistController.js";
import wishlistDbRepository from "../../../../application/repositories/wishlistDbRepository.js";
import wishlistDbRepositoryMongoDB from "../../../database/mongoDb/repositories/wishlistRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function reqBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const dbRepository = wishlistDbRepository(wishlistDbRepositoryMongoDB());
  const controller = wishlistController(dbRepository);

  router.route("/id").get(authMiddleware, controller.fetchWishlistIds);
  router.route("/").get(authMiddleware, controller.fetchWishlist);

  router
    .route("/:id")
    .post(authMiddleware, controller.addToWishlistById)
    .delete(authMiddleware, controller.removeFromWishlistById);

  return router;
}
