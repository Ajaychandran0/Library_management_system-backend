import authServiceImpl from "../../services/authService.js";
import authServiceInterface from "../../../application/services/authService.js";

export default function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");
  const authService = authServiceInterface(authServiceImpl());
  if (!token) {
    res.status(401).json({message:"No access token found"});
  }
  if (token.split(" ")[0] !== "Bearer") {
    res.status(401).json({message:"Invalid access token format"});
  }
  try {
    const decoded = authService.verify(token.split(" ")[1]);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({message:"Token is not valid"});
  }
}
