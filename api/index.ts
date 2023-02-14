import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import { NotFoundError } from "../src/config/errors";
import errorMiddleware from "../src/middlewares/error";
import routes from "../src/config/routes";
import env from "../src/config/env";
import logger from "../src/config/logger";
const app = express();

require("../src/config/db")();

app.use(compression());
app.use(morgan('dev'));
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

app.use(cors());

const PORT = env.PORT;
const mode = env.NODE_ENV;

app.listen(PORT, () => {
  logger.info(`app listening at port ${PORT} in ${mode} mode`);
});
