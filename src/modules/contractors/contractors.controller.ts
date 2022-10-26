import { Request, Response } from "express";
import { ethers } from "ethers";
import response from "../../utils/response";
import { generateAuthToken } from "../../utils/token";

import { BadRequestError } from "../../config/errors";

import contractorService from "../contractors/contractors.service";

import { omit, pick } from "../../utils/lodash";

import {
  IDecodedAuth,
  IContractor,
  IContractorRegister,
  IContractorLogin,
} from "../contractors/contractors.types";

class ContractorController {
  async register(req: Request, res: Response) {
    const credentials = req.body as IContractorRegister;
    const message =
      "MServices wants you to confirm your identity, please sign this message to proceed.";

    try {
      credentials.wallet = ethers.utils.verifyMessage(
        message,
        credentials.signature
      );
    } catch (error) {
      throw new BadRequestError("Invalid Signature");
    }

    const contractor = await contractorService.create(credentials);
    const authToken = generateAuthToken(contractor);

    res.send(response("Contractor created successfully", authToken));
  }

  async login(req: Request, res: Response) {
    const { signature } = req.body as IContractorLogin;
    const message =
      "MServices wants you to confirm your identity, please sign this message to proceed.";

    try {
      const wallet = ethers.utils.verifyMessage(message, signature);
      const user = await contractorService.findByWallet(wallet);
      if (!user) throw new BadRequestError("Invalid Contractor");
      const authToken = generateAuthToken(user);

      res.send(response("Contractor retrieved successfully", authToken));
    } catch (error) {
      throw new BadRequestError("Invalid Signature");
    }
  }

  async getContractorFromJwt(req: Request, res: Response) {
    const authToken = req.headers["x-auth-token"] as string;
    const decodedData = contractorService.verifyAuthToken(
      authToken
    ) as IDecodedAuth;
    const contractor: IContractor = await contractorService
      .findById(decodedData.id)
      .select("-__v");

    if (!contractor) throw new BadRequestError("Invalid Contractor");

    res.send(response("Contractor retrieved successfully", contractor));
  }

  async getContractors(req: Request, res: Response) {
    const contractors: IContractor[] =
      await contractorService.getAllContractors();

    res.send(response("Contractors retrieved successfully", contractors));
  }

  async getContractorDetails(req: Request, res: Response) {
    const { id } = req.params;
    const contractor: IContractor = await contractorService
      .findById(id)
      .select("-password -__v");

    res.send(response("Contractor retrieved successfully", contractor));
  }

  async getContractorProfile(req: Request, res: Response) {
    const { id } = req.params;
    const contractor: IContractor = await contractorService
      .findById(id)
      .select("-__v");

    res.send(response("Contractor retrieved successfully", contractor));
  }

  async updateContractor(req: Request & { contractor: any }, res: Response) {
    const update = req.body;
    const id = req.contractor.id;
    const updatedContractor = await contractorService.update(id, update);
    if (!updatedContractor) throw new BadRequestError("Invalid Contractor");

    res.send(response("Contractor was updated successfully", updatedContractor));
  }
}

export default new ContractorController();
