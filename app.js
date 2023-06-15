import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import redis from "redis";
import http from "http";
import expressConfig from "./frameworks/webserver/express.js";
import mongoDbConnection from "./frameworks/database/mongoDb/connection.js";
import serverConfig from "./frameworks/webserver/server.js";
import routes from "./frameworks/webserver/routes/index.js";
import redisConnection from "./frameworks/database/redis/connection.js";
// eslint-disable-next-line max-len
// import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorHandlingMiddleware.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// express.js configuration
expressConfig(app);

// server configuration and start
serverConfig(server).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose).connectToMongo();

const redisClient = redisConnection(redis).createRedisClient();
// routes for each endpoint
routes(app, express, redisClient);

// app.use(errorHandlingMiddleware);

export default app;
