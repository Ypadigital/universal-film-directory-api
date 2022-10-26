import { format, createLogger, transports } from "winston";
import env from "../env";
const { APP_NAME } = env;

const { combine, timestamp, label, printf, colorize, errors } = format;

interface ILogParams {
  level: string;
  message: string;
  label: string;
  timestamp: string;
  stack: string;
}

const logFormat = printf(
  ({ level, message, label, timestamp, stack }: ILogParams) => {
    message = message.replace(/[[\d]+m/g, "");
    return `${timestamp}\n[${label}] ${level}:\n${stack || message}\n`;
  }
);

const consoleFormat = printf(
  ({ level, message, label, timestamp, stack }: ILogParams) => {
    return `${timestamp}\n[${label}] ${level}:\n${stack || message}\n`;
  }
);

const logger = createLogger({
  format: combine(
    label({ label: APP_NAME }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), consoleFormat),
    }),
    new transports.File({ filename: "errors.log", level: "error" }),
    new transports.File({ filename: "all-logs.log" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "unhandled-rejections.log" }),
  ],
});

export default logger;
