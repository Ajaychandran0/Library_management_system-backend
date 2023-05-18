import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default function authService() {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

  const verify = (token, role) => {
    const jwtSecret = role === "admin" ? process.env.JWT_ADMIN_SECRET : process.env.JWT_USER_SECRET;
    return jwt.verify(token, jwtSecret);
  };

  const generateToken = (payload) => {
    const jwtSecret = payload.user.role === "admin"
      ? process.env.JWT_ADMIN_SECRET
      : process.env.JWT_USER_SECRET;
    return jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
  };

  return {
    encryptPassword,
    compare,
    verify,
    generateToken
  };
}
