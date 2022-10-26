import mongoose from "mongoose";
import env from "../config/env";
import logger from "../config/logger";

const db = env.DB_URI;

module.exports = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info(`Connected to ${db}`);
    })
    .catch((err: Error) => {
      return logger.error(err.message);
    });
};
