import { model, Schema } from "mongoose";
import { Gender, IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: { type: Number },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: { type: String },
    collections: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
    },
    material: { type: String },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: { type: Number },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Product = model("products", productSchema);
export default Product;
