import "express-async-errors";
import express from "express";
const app = express();

import env from "./config/env";
import logger from "./config/logger";

require("./config/db")();
require("./config/routing")(app);

const PORT = env.PORT;
const mode = env.NODE_ENV;

import http from "http";
import https from "https";
const serverProtocol: any = env.NODE_ENV === "production" ? https : http;
const server = serverProtocol.createServer(app);
import { Server } from "socket.io";

const io = new Server(server, { allowEIO3: true, cors: { origin: "*" } });
const STATIC_CHANNELS = ["global_notifications", "global_chat"];
// io.on("connection", (socket: any) => {
//   /* socket object may be used to send specific messages to the new connected client */
//   console.log("a user connected");
//   // socket.emit("connection", null);
//   // socket.on("disconnect", function () {
//   //   /* socket object may be used to send specific messages to the new connected client */
//   //   console.log("client disconnected");
//   //   socket.emit("connection", null);
//   // });
//   // socket.on("logout", function () {
//   //   io.emit("logout", 10);
//   //   console.log("Logged out", "id");
//   // });
//   // setInterval(() => {
//     // socket.emit("onmessage", "Test Message");
//     // console.log("sending message")
//   // }, 3000);
//   socket.disconnect();
// });

server.listen(PORT, () => {
  logger.info(`app listening at port ${PORT} in ${mode} mode`);
});
