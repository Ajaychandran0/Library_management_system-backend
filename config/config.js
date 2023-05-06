export default {
  port: process.env.SERVER_PORT || 5000,
  mongo: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/Horizon-LMS",
  },
  jwtAdminSecret: process.env.JWT_ADMIN_SECRET || "jkl!±@£!@ghj1237",
  jwtUserSecret: process.env.JWT_USER_SECRET || "gdkt!-+@gdkt253",
};
