import Images from "./images.model";
import { IImage } from "./images.types";

class ImagesService {
  async create(Image: IImage): Promise<IImage> {
    return Images.create(Image);
  }
  async find(tokenId: string): Promise<IImage> {
    return Images.findOne({ "image.public_id": tokenId });
  }
}

export default new ImagesService();
