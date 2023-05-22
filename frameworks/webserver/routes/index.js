import adminAuthRouter from "./admin/auth.js";
import adminMemberRouter from "./admin/members.js";
import memberAuthRouter from "./member/auth.js";
import adminCategoryRouter from "./admin/categories.js";
import adminBookRouter from "./admin/books.js";
import bookRouter from "./member/books.js";
import categoryRouter from "./member/categories.js";
import bookRequestRouter from "./member/requestedBook.js";

export default function routes(app, express) {
  // admin routes
  app.use("/admin/login", adminAuthRouter(express));
  app.use("/admin/members", adminMemberRouter(express));
  app.use("/admin/categories", adminCategoryRouter(express));
  app.use("/admin/books", adminBookRouter(express));

  // user routes
  app.use("/login", memberAuthRouter(express));
  app.use("/books", bookRouter(express));
  app.use("/categories", categoryRouter(express));
  app.use("/requested_books", bookRequestRouter(express));
}
