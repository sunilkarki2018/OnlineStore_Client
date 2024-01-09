import { CreateProductInput } from "./CreateProductInput";

export interface UpdateProductInput { 
  id: string;
  inventory: number;
  productLineId: string;
  productSizeId?: string | null;
}
