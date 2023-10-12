import { CreateProductInput } from "./CreateProductInput";

export interface UpdateProductInput {
  update: Partial<CreateProductInput>;
  id: number;
}
