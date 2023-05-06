import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config/config.js";

export default function authService() {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

  const verify = (token, role) => {
    const jwtSecret = role === "admin" ? config.jwtAdminSecret : config.jwtUserSecret;
    return jwt.verify(token, jwtSecret);
  };

  const generateToken = (payload) => {
    const jwtSecret = payload.role === "admin" ? config.jwtAdminSecret : config.jwtUserSecret;
    return jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
  };

  return {
    encryptPassword,
    compare,
    verify,
    generateToken
  };
}
