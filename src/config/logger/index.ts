import env from "../env";
import devLogger from "./dev";
import prodLogger from "./prod";

interface Ilogger {
  info: (message: any) => void;
  error: (message: any) => void;
}
const logger: Ilogger = env.NODE_ENV === "production" ? prodLogger : devLogger;

export default logger;
