export default function addRole(req, res, next) {
  req.role = "admin";
  next();
}
