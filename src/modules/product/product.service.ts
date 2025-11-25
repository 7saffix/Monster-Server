import AppError from "../../errorHelper/appError";
import { IProduct, IProductQueryOptions } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: IProduct) => {
  const product = await Product.create(payload);
  return product;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const updatedData = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedData;
};

const getAllProduct = async (queryOptions: IProductQueryOptions) => {
  const { filters = {}, search, sortBy, page, limit } = queryOptions;

  const query: any = {};

  //Filter
  const {
    collections,
    category,
    gender,
    material,
    brand,
    sizes,
    colors,
    maxPrice,
    minPrice,
  } = filters;

  if (collections) query.collections = collections;
  if (category) query.category = category;
  if (gender) query.gender = gender;
  if (colors) query.colors = colors;
  if (material)
    query.material = {
      $in: Array.isArray(material) ? material : material.split(","),
    };
  if (brand)
    query.brand = { $in: Array.isArray(brand) ? brand : brand.split(",") };
  if (sizes)
    query.sizes = { $in: Array.isArray(sizes) ? sizes : sizes.split(",") };

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  //Search
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  //Sorting
  let sortOptions: any = {};
  switch (sortBy) {
    case "latest":
      sortOptions = { createdAt: -1 };
      break;
    case "popular":
      sortOptions = { rating: -1 };
      break;
    case "priceHighToLow":
      sortOptions = { price: -1 };
      break;
    case "priceLowToHigh":
      sortOptions = { price: 1 };
      break;
    default:
      sortOptions = { createdAt: -1 };
      break;
  }

  //Pagination
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  return { meta: { total, page, limit }, products };
};

const getProductDetails = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, "product not found");

  return product;
};

const getSimilarProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, "product not found");

  const similarProduct = await Product.find({
    _id: { $ne: id },
    gender: product.gender,
    category: product.category,
  }).limit(4);
  return similarProduct;
};

const getBestSellerProduct = async () => {
  const bestSeller = await Product.findOne().sort({ rating: -1 });
  return bestSeller;
};
const newArrivalProduct = async () => {
  const newArrival = await Product.find().sort({ createdAt: -1 }).limit(8);
  return newArrival;
};

export const productService = {
  createProduct,
  updateProduct,
  getAllProduct,
  getProductDetails,
  getSimilarProduct,
  getBestSellerProduct,
  newArrivalProduct,
};
