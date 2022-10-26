import { Request } from "express";

import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

import fs from "fs";
import { BadRequestError } from "../config/errors";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/*"];

//adjust how files are stored
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    let dir = process.cwd();
    // console.log(file.mimetype);
    //Sets destination for fileType
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      dir = dir + `/uploads/images`;
    } else {
      dir = dir + `/uploads/docs`;
    }

    fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
  },
  filename: function (req, file, callback: FileNameCallback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestError("Image upload failed. Supports only jpeg and png")
    );
  }
};

const imageMulter = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const docMulter = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 250,
  },
  fileFilter: fileFilter,
});

export { imageMulter, docMulter };
