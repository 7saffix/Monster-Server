import { ObjectId } from "mongoose";

export enum Gender {
  Men = "Men",
  Women = "Women",
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  countInStock: number;
  category: string;
  brand?: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material?: string;
  images: string[];
  gender: Gender;
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  totalReviews: number;
  tags?: string[];
  user: ObjectId;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
}

export interface IProductQueryOptions {
  filters: Record<string, any>;
  search: string;
  sortBy: string;
  page: number;
  limit: number;
}
