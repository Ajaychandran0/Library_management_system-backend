import adminAuthRouter from "./admin/auth.js";
import adminMemberRouter from "./admin/members.js";
import adminCategoryRouter from "./admin/categories.js";
import adminBookRouter from "./admin/books.js";
import adminReqBookRouter from "./admin/requestedBooks.js";
import adminIssuedBookRouter from "./admin/issuedBooks.js";
import adminReturnedBookRouter from "./admin/returnedBooks.js";
import adminLostBookRouter from "./admin/lostBooks.js";

import memberAuthRouter from "./member/auth.js";
import bookRouter from "./member/books.js";
import categoryRouter from "./member/categories.js";
import bookRequestRouter from "./member/requestedBooks.js";
import wishlistRouter from "./member/wishlist.js";
import issuedBookRouter from "./member/issuedBooks.js";
import returnedBookRouter from "./member/returnedBooks.js";
import lostBookRouter from "./member/lostBooks.js";
import memberAccountRouter from "./member/memberAccount.js";
import paymentRouter from "./member/payment.js";

export default function routes(app, express, redisClient) {
  // admin routes
  app.use("/api/admin/login", adminAuthRouter(express));
  app.use("/api/admin/members", adminMemberRouter(express, redisClient));
  app.use("/api/admin/categories", adminCategoryRouter(express, redisClient));
  app.use("/api/admin/books", adminBookRouter(express, redisClient));
  app.use("/api/admin/requested_books", adminReqBookRouter(express, redisClient));
  app.use("/api/admin/issued_books", adminIssuedBookRouter(express, redisClient));
  app.use("/api/admin/returned_books", adminReturnedBookRouter(express, redisClient));
  app.use("/api/admin/lost_books", adminLostBookRouter(express, redisClient));

  // user routes
  app.use("/api/login", memberAuthRouter(express));
  app.use("/api/account", memberAccountRouter(express));
  app.use("/api/books", bookRouter(express, redisClient));
  app.use("/api/categories", categoryRouter(express, redisClient));
  app.use("/api/requested_books", bookRequestRouter(express, redisClient));
  app.use("/api/wishlist", wishlistRouter(express, redisClient));
  app.use("/api/issued_books", issuedBookRouter(express, redisClient));
  app.use("/api/returned_books", returnedBookRouter(express, redisClient));
  app.use("/api/lost_books", lostBookRouter(express, redisClient));
  app.use("/api/payment", paymentRouter(express));
}
