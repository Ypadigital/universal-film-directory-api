import env from "../config/env";
import crypto from "crypto";
import fs from "fs";
import { Request } from "express";

const { PAYSTACK_SECRET_KEY } = env;
export const getPaystackWebhook = (req: Request) => {
  const { headers, body } = req;

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest("hex");

  if (hash !== headers["x-paystack-signature"]) {
    return false;
  }

  const payload = body;

  return payload;
};
