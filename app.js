import express from "express";
import mongoose from "mongoose";
import http from "http";
import config from "./config/config.js";
import expressConfig from "./frameworks/webserver/express.js";
import mongoDbConnection from "./frameworks/database/mongoDb/connection.js";
import serverConfig from "./frameworks/webserver/server.js";
import routes from "./frameworks/webserver/routes/index.js";

const app = express();
const server = http.createServer(app);

// express.js configuration
expressConfig(app);

// server configuration and start
serverConfig(server, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config).connectToMongo();

// routes for each endpoint
routes(app, express);

export default app;
