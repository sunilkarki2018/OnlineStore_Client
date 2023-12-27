import { Category } from "../Category/Category";

export interface ProductLine {
    id: string;
    title: string;
    description: string;
    price: number;    
    categoryId: string;
    category: Category;
    imageReadDTOs: ImageReadDTO[];
  }

  