import { CreateProductLineInput } from "./CreateProductLineInput";

export interface UpdateProductLineInput {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  images: string[];
  id: string;
}
