import { Category } from "../Category/Category";
import { ProductLine } from "../ProductLine/ProductLine";
import { ProductSize } from "./ProductSize";

export interface Product {
  id: string;
  inventory: number;
  productLine: ProductLine;
  productSize?: ProductSize | null;
  productLineId: string;
  productSizeId?: string | null;
  category: Category;
}
