import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { productService } from "./product.service";
import { sendResponse } from "../../utils/sendResponse";

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user.id;
    const productData = { ...req.body, user };

    const product = await productService.createProduct(productData);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "product created successfully",
      data: product,
    });
  }
);

const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productID = req.params.id;
    const user = req.user.id;
    const updatedData = { ...req.body, user };

    const product = await productService.updateProduct(productID, updatedData);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "product updated successfully",
      data: product,
    });
  }
);
const getAllProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, sortBy, page, limit, ...filters } = req.query;

    const result = await productService.getAllProduct({
      filters: filters as Record<string, any>,
      search: search as string,
      sortBy: sortBy as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "products retrieved successfully",
      meta: result.meta,
      data: result.products,
    });
  }
);
const getProductDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.getProductDetails(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "product retrieved successfully",
      data: result,
    });
  }
);
const getSimilarProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.getSimilarProduct(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "product retrieved successfully",
      data: result,
    });
  }
);
const getBestSellerProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.getBestSellerProduct();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "best seller product retrieved successfully",
      data: result,
    });
  }
);
const newArrivalProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.newArrivalProduct();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "new arrival products retrieved successfully",
      data: result,
    });
  }
);

export const productController = {
  createProduct,
  updateProduct,
  getAllProduct,
  getProductDetails,
  getSimilarProduct,
  getBestSellerProduct,
  newArrivalProduct,
};
