import { Request, Response } from "express";
import { uploadToCloud } from "../../lib/cloudinary";

import response from "../../utils/response";
import imagesService from "./images.service";

class ImagesController {
  async create(req: Request, res: Response) {
    const { file } = req;
    const upload = await uploadToCloud(file.path);
    const image = await imagesService.create({
      url: upload.secure_url,
      size: upload.bytes,
      public_id: upload.public_id,
      filename: upload.original_filename,
      type: upload.format,
    });
    res.send(response("Successfully Created Image", image));
  }
  async getImage(req: Request, res: Response) {
    const { tokenId } = req.params;
    const image = await imagesService.find(tokenId);
    res.send(response("Successfully Fetched Image", image));
  }
}

export default new ImagesController();
