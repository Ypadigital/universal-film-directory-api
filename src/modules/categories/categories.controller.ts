import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import categoryService from "./categories.service";

import categoriesService from "./categories.service";

class CategoryController {
  async create(req: Request, res: Response) {
    const category = await categoriesService.create(req.body);
    res.send(response("Category created successfully", category));
  }

  async getAllCategories(req: Request, res: Response) {
    const categories = await categoriesService.getAllCategories();

    res.send(response("Category retrieved successfully", categories));
  }

  async getCategoryById(req: Request, res: Response) {
    const category = await categoriesService.findById(req.params.id);

    res.send(response("Categories retrieved successfully", category));
  }

  async updateCategory(req: Request & { category: any }, res: Response) {
    const update = req.body;
    const id = req.params.id;
    const updatedCategory = await categoryService.update(id, update);
    if (!updatedCategory) throw new BadRequestError("Invalid Category");

    res.send(response("Category was updated successfully", updatedCategory));
  }
}

export default new CategoryController();
