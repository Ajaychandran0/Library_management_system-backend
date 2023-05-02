export default {
  port: process.env.PORT || 5000,
  mongo: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/Horizon-LMS",
  },
  jwtSecret: process.env.JWT_SECRET || "jkl!±@£!@ghj1237",
};
