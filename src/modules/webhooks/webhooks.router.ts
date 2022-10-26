const router = require("express").Router();

import { getPaystackWebhook } from "../../lib/payments";
import transactionsService from "../../modules/transactions/transactions.service";
import { ITransaction } from "modules/transactions/transactions.types";
import { Request, Response } from "express";
import response from "../../utils/response";
import { UnAuthorizedError } from "../../config/errors";

router.post("/webhooks/paystack", async (req: Request, res: Response) => {
  const data = getPaystackWebhook(req);
  if (!data) throw new UnAuthorizedError("Cannot access link");
  console.log(data);
  const txn: ITransaction = {
    amount: { currency: "NGN", value: 1000 },
    plan_id: "5f9f1b0b0b9b9c0b8c0b8c0b",
    type: "deposit",
    userId: "5f9f1b0b0b9b9c0b8c0b8c0b",
  };
  const trans = await transactionsService.create(txn);
  res.send(response("transaction complete", trans));
});

export default router;
