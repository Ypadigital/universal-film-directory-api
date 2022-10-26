const router = require("express").Router();

import { imageMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import { imageUpload } from "../images/images.validators";
import imagesController from "./images.controller";

router.post(
  "/images/upload",
  imageMulter.single("file"),
  validateBy(imageUpload),
  imagesController.create
);

router.get(
  "/images/:id",
  imagesController.getImage
);


// router.post(
//   "/images",
//   imageMulter.single("file"),
//   validateBy(signUp),
//   imagesController.create
// );

export default router;
