import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";

import { NotFoundError } from "../config/errors";
import errorMiddleware from "../middlewares/error";
import routes from "./routes";

module.exports = (app: Application) => {
  app.use(compression());
  app.use(morgan("dev"));

  app.use(express.static("public"));
  app.use("/api/v1/static", express.static("uploads"));
  app.use(express.json({ limit: "1mb", type: "application/json" }));
  app.use(express.urlencoded({ extended: false }));

  app.use(cors());

  app.use("/ping", (req, res) => res.send(`Live`));
  app.use("/api/v1", routes);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
  });

  app.use(errorMiddleware);

  return app;
};
