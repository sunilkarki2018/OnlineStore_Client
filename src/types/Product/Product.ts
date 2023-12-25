import { Category } from "../Category/Category";
import { ProductLine } from "./ProductLine";

export interface Product {
  id: string;
  inventory: number;
  productLine: ProductLine;
  productSize?: ProductLine | null;
  productLineId: string;
  productSizeId?: string | null;
  category:Category;
  images:Image[];
  }