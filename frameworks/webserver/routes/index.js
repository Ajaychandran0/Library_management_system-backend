import adminAuthRouter from "./admin/auth.js";
import adminMemberRouter from "./admin/members.js";
import memberAuthRouter from "./member/auth.js";

export default function routes(app, express) {
  app.use("/admin/login", adminAuthRouter(express));
  app.use("/admin/members", adminMemberRouter(express));
  app.use("/login", memberAuthRouter(express));
}
