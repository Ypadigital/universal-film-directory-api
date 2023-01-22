const router = require("express").Router();

import validateById from "../../middlewares/validateById";
import validateBy from "../../middlewares/validator";
import categoryController from "./categories.controller";
import { addCategoryValidator } from "./categories.validators";

router.get("/categories", categoryController.getAllCategories);
router.get(
  "/categories/:id",
  validateById(),
  categoryController.getCategoryById
);

router.post(
  "/categories",
  validateBy(addCategoryValidator),
  categoryController.create
);
router.put(
  "/categories/:id",
  [validateById(), validateBy(addCategoryValidator)],
  categoryController.updateCategory
);

export default router;
