import { Category } from "../Category/Category";
import { Product } from "../Product/Product";

export interface ProductLine {
    id: string;
    title: string;
    description: string;
    price: number;    
    categoryId: string;
    category: Category;
    imageReadDTOs: ImageReadDTO[];
  }