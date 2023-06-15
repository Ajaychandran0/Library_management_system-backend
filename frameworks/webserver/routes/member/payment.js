import paymentController from "../../../../adapters/controllers/paymentController.js";
import returnedBookDbRepository from "../../../../application/repositories/returnedBookDbRepository.js";
import returnedBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/returnedBookRepositoryMongoDb.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import lostBookDbRepository from "../../../../application/repositories/lostBookDbRepository.js";
import lostBookDbRepositoryMongoDB from "../../../database/mongoDb/repositories/lostBookRepositoryMongoDb.js";
import paymentServiceInterface from "../../../../application/services/paymentService.js";
import paymentServiceImpl from "../../../services/paymentService.js";

export default function lostBookRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const returnedBookRepository = returnedBookDbRepository(
    returnedBookDbRepositoryMongoDB()
  );
  const lostBookRepository = lostBookDbRepository(
    lostBookDbRepositoryMongoDB()
  );
  const paymentService = paymentServiceInterface(paymentServiceImpl());
  const controller = paymentController({
    returnedBookRepository,
    paymentService,
    lostBookRepository
  });

  router
    .route("/overdue")
    .post(authMiddleware, controller.handleOverduePayment)
    .patch(authMiddleware, controller.updateOverduePaymentStatus);
  // router
  //   .route("/lostFine")
  //   .post(authMiddleware, controller.handleLostBookPayment);

  return router;
}
