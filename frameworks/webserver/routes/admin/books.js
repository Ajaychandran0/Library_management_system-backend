import bookController from "../../../../adapters/controllers/bookController.js";
import bookDbRepository from "../../../../application/repositories/bookDbRepository.js";
import bookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/bookRepositoryMongoDb.js";
import bookRedisRepository from "../../../../application/repositories/bookRedisRepository.js";
import bookRedisRepositoryImpl from "../../../database/redis/bookRepositoryRedis.js";
import redisCachingMiddleware from "../../middlewares/redisCachingMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

export default function bookRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const bookRepository = bookDbRepository(bookDbRepositoryMongoDB());
  const cachingRepository = bookRedisRepository(
    bookRedisRepositoryImpl()(redisClient)
  );
  const controller = bookController({ bookRepository, cachingRepository });

  router
    .route("/")
    .get(
      authMiddleware,
      redisCachingMiddleware(redisClient, "books"),
      controller.fetchBooksByProperty
    )
    .post(authMiddleware, controller.addNewbook);

  router
    .route("/:id")
    .put(authMiddleware, controller.updateBookById)
    .delete(authMiddleware, controller.deleteBookById);

  return router;
}
