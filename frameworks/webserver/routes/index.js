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

export default function routes(app, express) {
  // admin routes
  app.use("/admin/login", adminAuthRouter(express));
  app.use("/admin/members", adminMemberRouter(express));
  app.use("/admin/categories", adminCategoryRouter(express));
  app.use("/admin/books", adminBookRouter(express));
  app.use("/admin/requested_books", adminReqBookRouter(express));
  app.use("/admin/issued_books", adminIssuedBookRouter(express));
  app.use("/admin/returned_books", adminReturnedBookRouter(express));
  app.use("/admin/lost_books", adminLostBookRouter(express));

  // user routes
  app.use("/login", memberAuthRouter(express));
  app.use("/books", bookRouter(express));
  app.use("/categories", categoryRouter(express));
  app.use("/requested_books", bookRequestRouter(express));
  app.use("/wishlist", wishlistRouter(express));
  app.use("/issued_books", issuedBookRouter(express));
  app.use("/returned_books", returnedBookRouter(express));
  app.use("/lost_books", lostBookRouter(express));
}
