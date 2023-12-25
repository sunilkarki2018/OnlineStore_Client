import { Category } from "../Category/Category";
import { Product } from "./Product";

export interface ProductLine {
    id: string;
    title: string;
    description: string;
    price: number;    
    categoryId: number;
    category: Category;
    images: Image[];
  }